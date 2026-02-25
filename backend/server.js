import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { Quest, User } from "./schemas.js";
import quests from "./quests.json";
import bcrypt from "bcrypt-nodejs";
import { authentificateUser } from "./authMiddleware";
import "dotenv/config";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

//seeding of DB, OBS! only if =true
if (process.env.RESET_FB) {
  const seedDatabase = async () => {
    await Quest.deleteMany(); //this will delete everything we have in database

    quests.forEach((quest) => {
      new Quest(quest).save();
    });
  };
  seedDatabase();
}

// ---- Middleware to handle error at service availability before running anything else
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// ---- All ENDPOINTS, temporary ----

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  console.log({ endpoints: endpoints });
  res.json({
    message: "List of all endpoints",
    endpoints: endpoints,
  }); // FIXME delete res.json before prod!
  //console.log("OUR ENV VAR", process.env.OUR_VAR);
});

// TODO ---- POST ENDPOINTS ----

// TODO ---- USER ----

// MUST ---- Register new user ----
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to sign up",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //One-way encryption:
    const salt = bcrypt.genSaltSync();
    const hashedPass = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPass,
    });

    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User with this name or email already exists",
      });
    }
    res.status(400).json({
      success: false,
      message: "Could not create user",
      errors: err.errors,
    });
  }
});

// MUST ---- Login with existing user ----
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //retrieving from database by email, should be unique

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required to login" });
  }

  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      //Success
      res.json({ userID: user._id, accessToken: user.accessToken });
    } else {
      //Failed:
      //1.User doesn't exist
      //2.Password doesn't match
      res.status(401).json({
        success: false,
        message: "Smth went wrong, check your email and password",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, err: "Something went wrong" });
  }
});

// TODO ---- QUESTS ----

// FIXME Update to auth authorized users, add error handling or redirecting for not authorized // MUST --- Create a quest >>>>> only for auth users
app.post("/quests", authentificateUser, async (req, res) => {
  const { message, timeNeeded, category, deadline } = req.body;
  //console.log("createdBy:", req.user?.id);

  try {
    const quest = await new Quest({
      message,
      timeNeeded,
      category,
      deadline,
      createdBy: req.user._id,
    }).save();
    res.status(201).json(quest);
  } catch (err) {
    res.status(500).json({
      message: "Couldn't save quest, please try again",
      error: err.errors,
    });
  }
});

// FIXME MUST ---- Add quest from default library to user's list  >>>>> only for auth users
app.post("/quests/library/add", (req, res) => {
  console.log("Add quest from default library to user's list");
});

//FIXME NICE+ ---- User completes task too fast confirmation >>>>> only for auth users
app.post("/quests/:id/confirm-complete", (req, res) => {
  console.log("Do not cheat, ok?");
});

// FIXME MUST ---- ??? is it post? Quests randomization, (filter tasks =< time available today; re-try rule; randomization session with sessionId), >>>>> only for auth users
app.post("/quests/random", (req, res) => {
  res.send("Random quest");
});

// FIXME MUST ---- ??? is it post? Re-try to get a new quest >>>>> only for auth users
app.post("/quests/random/:sessionId/retry", (req, res) => {
  console.log("re-try");
});

// FIXME EXTRA ---- Add actual time >>>>> only for auth users
app.post("/quests/:id/add-time", (req, res) => {
  console.log("Add actual time");
});

// FIXME NICE+ ---- Skip a day of quests >>>>> only for auth users
app.post("/quests/skip");

// FIXME NICE+ ---- Repetitive quests >>>>> only for auth users
app.post("/quests/:id/repeat");

// ---- FRIENDS ----
// FIXME add auth MUST --- Give kudos >>>>> only for auth users
app.post("/friends/:postid/kudos", async (req, res) => {
  //console.log("Give kudos");
  const update = { $inc: { kudos: 1 } };
  const options = { new: true, runValidators: true };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, response: "Id is invalid" });
  }

  try {
    const addKudos = await Quest.findByIdAndUpdate(id, update, options);

    if (!addKudos) {
      return res.status(404).json({
        success: false,
        message: "Can't add kudos, entry is invalid or it was deleted",
      });
    }
    res.status(200).json(addKudos);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Couldn't add kudos, try again",
      error: err.errors,
    });
  }
});

// TODO ---- PUNISHMENTS ----
// EXTRA ---- Send an embarrassing message to smbdy >>>>> only for auth users
app.post("/punishment/embarrass-me", (req, res) => {
  console.log("Welp it didn't go well");
});

// EXTRA ---- Lock instagram or tiktok for an hour >>>>> only for auth users
app.post("/punishment/lock", (req, res) => {
  console.log("def too much");
});

// TODO ---- GET ENDPOINTS ----

// TODO ---- QUESTS ----

// FIXME ??? MUST ---- Quests default library (returns default tasks, categories, est time), can filter on one category and time <= N. Returns from hardcoded file
app.get("/quests/library", (req, res) => {
  const { category, time } = req.query;

  //Test example: http://localhost:8080/quests/library/?category=cleaning&time=20
  try {
    let filteredQuests = quests;

    if (category) {
      filteredQuests = filteredQuests.filter((item) => {
        return item.category.some((word) => {
          return word.toLowerCase() === category.toLowerCase();
        });
      });
    }

    if (time) {
      filteredQuests = filteredQuests.filter((item) => {
        return item.timeNeed <= Number(time);
      });
    }
    return res
      .status(200)
      .json({ success: true, response: filteredQuests, message: "Success" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, response: [], message: err.errors });
  }
});

// FIXME ?? MUST ----- Returns all user's quests, can filter on category and time <= N) >>>>> only for auth users.
// Returns from database ---------
app.get("/quests/all", authentificateUser, async (req, res) => {
  let { category, time } = req.query;
  const query = { createdBy: req.user._id };

  if (category) {
    category = category.toLowerCase();
    query.category = category;
  }
  if (time) {
    time = Number(time);
    query.timeNeeded = { $lte: time };
  }

  try {
    const filteredQuests = await Quest.find(query).populate("createdBy");

    if (!filteredQuests.length) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Couldn't find any quests with these filters",
      });
    }
    return res
      .status(200)
      .json({ success: true, response: filteredQuests, message: "Success" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, response: [], message: err.errors });
  }
});

// FIXME add auth and error handling MUST ---- User's done quests /quests/done/true
app.get("/quests/done/:done", (req, res) => {
  const done = req.params.done;
  const questsDone = quests.filter((item) => item.done === done);
  res.json(questsDone);
});

// FIXME add randomizing, add looking through all users quests(added from library to users database)
// MUST ---- User's daily random(!) quest >>>>> only for auth users // "/user/:userId/quests/:questId"
//NOW: only finds one from general database
app.get("/quests/:id", authentificateUser, async (req, res) => {
  const { id } = req.params;

  try {
    // const libraryQuests = quests.find((item) => item._id === id);
    const dailyQuest = await Quest.findById(id); //from database
    if (!dailyQuest) {
      return res.status(404).json({
        success: false,
        respons: null,
        error: `Quest with ${id} is not found`,
      });
    }

    res.json({ success: true, response: dailyQuest });
  } catch (err) {
    res.status(500).json({
      success: false,
      response: null,
      error: `Something went wrong, ${id} is not valid`,
    });
  }
});

// FIXME MUST ---- User's Rewards Collection >>>>> only for auth users
app.get("/rewards", (req, res) => {
  res.send("Your reward is here");
});

// FIXME MUST ---- Streaks >>>>> only for auth users
app.get("/streaks", (req, res) => {
  console.log("Your streak");
});

// FIXME NICE+ ---- Quests history >>>>>> only for auth users
app.get("/quests/history", (req, res) => {
  console.log("Shows how much user have done before");
});

// TODO ---- MAIN PAGES ----

// TODO ---- USER ----
// FIXME ---- Smiley state of mood ---- >>>> only for auth users, returns sad/happy/delighted avatars
app.get("/user/:id/state", (req, res) => {
  /* console.log("this is your mode"); */
  res.send("User mood");
});

// FIXME Nice+ ---- User page (shows: current strike, settings, log out, delete user, bonus points, profile picture state, user library) >>>>> only for auth users
app.get("/profile/:id", (req, res) => {
  /* console.log("user info page"); */
  res.send("User profle");
});

// TODO ---- FRIENDS ----

// FIXME MUST ---- Friends Feed page (alt: any other users feed?) >>>>> only for auth users( if it's a friends page, otherwise for everybody?)
app.get("/friends", (req, res) => {
  res.json([
    {
      name: "Jane",
      quest: "Dust your books",
      kudos: "5",
      doneAt: "2026-02-15",
    },
    {
      name: "John",
      quest: "Clean the kitchen",
      kudos: "38",
      doneAt: "2026-02-15",
    },
  ]);
});

// FIXME NICE+ ---- Find a friend bi ID page
app.get("/friends/:id", async (req, res) => {
  const friend = await User.findById(req.params.id); //search through users ids in database?
  res.json(friend);
});

// FIXME NICE+ ---- Find a friend by :name page
app.get("/friends/:name", async (req, res) => {
  const friend = await User.findOne(req.params.name); //search through users names in database?
  res.json(friend);
});

// TODO ---- DELETE ENDPOINTS ----

// TODO ---- USER ----

// FIXME MUST ---- Delete user >>>> only for auth user
app.delete("/user/:id", (req, res) => {
  console.log("auth by id and delete user");
});

// TODO ---- QUESTS ----

// FIXME MUST ---- Delete one quest >>>>> only for authorised users for their list
app.delete("/quests/:id", async (req, res) => {
  //console.log("delete test");
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: `Couldn't find the quest with id ${id}, check if it is valid.`,
    });
  }

  try {
    const quest = await Quest.findByIdAndDelete(id).exec();
    if (!quest) {
      return res
        .status(404)
        .json({ error: `Couldn't find and delete quest with id ${id}` });
    }

    res.status(200).json({ message: "Quest was successfully deleted" });
  } catch (err) {
    res.status(400).json({ error: `Something went wrong, ${id} is not valid` });
  }
});

// FIXME EXTRA ---- DELETE more than 1 quest at a time >>>>> only for authorised users for their list
app.delete("/user/:id/quests/", (req, res) => {
  console.log("Delete user's quests");
});

// TODO ---- FRIENDS ----

// FIXME NICE+ ---- Delete a friend >>>>> only for authorised users for their feed
app.delete("/friends/:id", (req, res) => {
  console.log("delete friend");
});

// TODO ---- PUT ENDPOINTS ----

// TODO ---- PATCH ENDPOINTS ----

// FIXME: merge and test when deployed ---- Complete a quest >>>>> only for auth users
// app.patch("/quests/:id/complete", authentificateUser, async (req, res) => {
//   // get quest id from the url
//   const { id } = req.params;

//   // get the done value (true or false), this will be sent from the frontend when quest is checked or not
//   const { done } = req.body; 

//   // check if the id is valid
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ success: false, message: "Invalid quest ID" });
//   }

//   const updateData = {
//     done,
//     doneAt: done ? new Date() : null,
//     };

//     if(typeof done!== "boolean") {
//       return res.status(400).json({success: false, message: "Invalid type"})
//     }

//   try {
//     // Find the quest in the database and update its done field
//     const quest = await Quest.findOneAndUpdate(
//       { _id: id, createdBy: req.user._id }, // ensures user can only update their own quests
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!quest) {
//       return res.status(404).json({ success: false, message: "Quest not found or unauthorized" });
//     }

//     res.status(200).json({ success: true, response: quest });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Something went wrong", errors: err.errors });
//   }
// });

app.patch("/quests/:id/complete", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid quest ID" });
  }

  const updateData = {
    done,
    doneAt: done ? new Date() : null,
  };

  if(typeof done !== "boolean") {
    return res.status(400).json({success: false, message: "Invalid type"})
  }

  try {
    const quest = await Quest.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!quest) {
      return res.status(404).json({ success: false, message: "Quest not found" });
    }

    res.status(200).json({ success: true, response: quest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong", errors: err.errors });
  }
});

// FIXME EXTRA ---- Edit profile >>>>> only for authorised users for their own profiles(toggle easy/hard mode, change password?)
app.patch("/profile/:id/settings", (req, res) => {
  console.log("edit profile");
});

// FIXME NICE+ ---- Edit one quest >>>>> only for authorised users for their list

// ------ PATCH ENDPOINTS -----

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
