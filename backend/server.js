import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { Quest } from "./schemas";
import { User } from "./schemas";
import quests from "./quests.json";
import bcrypt from "bcrypt-nodejs";
import { authentificateUser } from "./authMiddleware";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

//Middleware to handle error at service availability before running anything else
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// ---- All ENDPOINTS, temporarily ----

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  console.log({ endpoints: endpoints });
  res.json({
    message: "List of all endpoints",
    endpoints: endpoints,
  }); // FIXME delete res.json before prod!
});

// TODO ---- POST ENDPOINTS ----

// TODO ---- USER ----

// FIXME update error handling and more MUST ---- Register new user ----
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// FIXME Update error handling / MUST ---- Login with existing user ----
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //retrieving from database by email, should be unique
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      //Success
      res.json({ userID: user._id, accessToken: user.accessToken });
    } else {
      //Failed:
      //1.User doesn't exist
      //2.Password doesn't match
      res.json({ message: "Smth went wrong, check your email and password" });
    }
  } catch (err) {
    res.status(400).json({ err: "Bad request" });
  }
});

// TODO ---- QUESTS ----

// FIXME Update to auth authorized users, add error handling or redirecting for not authorized // MUST --- Create a quest >>>>> only for auth users
app.post("/quests", async (req, res) => {
  const { message, timeNeeded, category, deadline } = req.body;

  try {
    const quest = await new Quest({
      message,
      timeNeeded,
      category,
      deadline,
    }).save();
    res.status(201).json(quest);
  } catch (err) {
    res.status(400).json({
      message: "Couldn't save quest, please try again",
      error: err.errors,
    });
  }
});

// FIXME MUST ---- Add quest from default library to user's list  >>>>> only for auth users
app.post("/quests/library/add", (req, res) => {
  console.log("Add quest from default library to user's list");
});

// FIXME MUST ---- Complete a quest >>>>> only for auth users
app.post("quests/:questid/complete", (req, res) => {
  console.log("Task is done");
});

//FIXME NICE+ ---- User completes task too fast confirmation >>>>> only for auth users
app.post("quests/:questid/confirm-complete", (req, res) => {
  console.log("Do not cheat, ok?");
});

// FIXME MUST ---- ??? is it post? Quests randomization, (filter tasks =< time available today; re-try rule; randomization session with sessionId), >>>>> only for auth users
app.post("/quests/random", (req, res) => {
  res.send("Random quest");
});

// FIXME MUST ---- ??? is it post? Re-try to get a new quest >>>>> only for auth users
app.post("quests/random/:sessionId/retry", (req, res) => {
  console.log("re-try");
});

//FIXME NICE+ ---- User completes task too fast confirmation >>>>> only for auth users
app.post("quests/:questid/confirm-complete", (req, res) => {
  console.log("Do not cheat, ok?");
});

// FIXME EXTRA ---- Add actual time >>>>> only for auth users
app.post("quests/:questid/add-time", (req, res) => {
  console.log("Add actual time");
});

// FIXME NICE+ ---- Skip a day of quests >>>>> only for auth users
app.post("/quests/skip");

// FIXME NICE+ ---- Repetitive quests >>>>> only for auth users
app.post("/quests/:questid/repeat");

// ---- FRIENDS ----
// FIXME MUST --- Give kudos >>>>> only for auth users
app.post("/friends/:postid/kudos", authentificateUser, (req, res) => {
  console.log("Give kudos");
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

// FIXME add error handling // MUST ---- Quests default library (returns default tasks, categories, est time), can filter on one category and time <= N
app.get("/quests/library", (req, res) => {
  const { category, time } = req.query;
  //console.log("category", category);
  let filteredQuests = quests;

  //Test example: http://localhost:8080/quests/library/?category=cleaning&time=20
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
  res.json(filteredQuests);
});

// FIXME MUST --- User's quests (returns all tasks user saved to their list, both from library and user-created, with categories and est time; can filter on categories and time <= N) >>>>> only for auth users
//Currently: only checks build-in library
app.get("/user/:id/quests/", authentificateUser, async (req, res) => {
  //const userQuests = await Quest.find().populate("createdBy");
  //res.send(userQuests);
  const user = await User.findById(req.params.id);
  const quests = await Quest.find({
    user: mongoose.Types.ObjectId.createFromHexString(user.id),
  });
  try {
    if (user) {
      res.json(quests);
    } else {
      res.status(404).json({ error: "Oops, user not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

// FIXME MUST ---- User's done quests /user/:id/quests/done/true
app.get("quests/done/:done", (req, res) => {
  const done = req.params.done;
  const questsDone = quests.filter((item) => item.done === done);
  res.json(questsDone);
});

// FIXME add randomizing, add looking through all database update error handling // MUST ---- User's daily random(!) quest >>>>> only for auth users // "/user/:userId/quests/:questId"
//NOW: only finds one from in-build library
app.get("/quests/:id", authentificateUser, (req, res) => {
  //res.send("My one random quest of the day");
  const { id } = req.params;

  try {
    const dailyQuest = quests.find((item) => item._id === id);

    if (!dailyQuest) {
      return res.status(404).json({ error: `Quest with ${id} is not found` });
    }

    res.json(dailyQuest);
  } catch (err) {
    res.status(400).json({ error: `Something went wrong, ${id} is not valid` });
  }
});

// FIXME MUST ---- User's Rewards Collection >>>>> only for auth users
app.get("user/:id/rewards", (req, res) => {
  res.send("Your reward is here");
});

// FIXME MUST ---- Streaks >>>>> only for auth users
app.get("user/:id/streaks", (req, res) => {
  console.log("Your streak");
});

// FIXME NICE+ ---- Quests history >>>>>> only for auth users
app.get("user/:id/quests/history", (req, res) => {
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
app.delete("/quests/:id", (req, res) => {
  //console.log("delete test");
  const { id } = req.params;

  try {
    const quest = quests.find((item) => item._id === id);
    if (!quest) {
      return res
        .status(404)
        .json({ error: `Couldn't find and delete quest with id ${id}` });
    }

    const allQuest = quests.filter((item) => item._id != id);

    quests = allQuest;

    res.json(quest);
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

// FIXME EXTRA ---- Edit profile >>>>> only for authorised users for their own profiles(toggle easy/hard mode, change password?)
app.patch("/profile/:id/settings", (req, res) => {
  console.log("edit profile");
});

// FIXME NICE+ ---- Edit one quest >>>>> only for authorised users for their list
app.patch("/quests/:id", (req, res) => {
  console.log("delete test");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
