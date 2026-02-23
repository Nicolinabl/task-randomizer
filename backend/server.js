import express, { json, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { FriendQuest, Quest } from "./schemas";
import { User } from "./schemas";
import { LibraryQuest } from "./schemas";
import quests from "./quests.json";
import bcrypt from "bcrypt-nodejs";
import { authentificateUser } from "./authMiddleware";
import "dotenv/config";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";

console.log("Starting server... With Mongo URL:", mongoUrl);

mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

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
  //console.log({ endpoints: endpoints });
  res.json({
    message: "List of all endpoints",
    endpoints: endpoints,
  }); // FIXME delete res.json before prod!
  //console.log("OUR ENV VAR", process.env.OUR_VAR);
});

// TODO ---- POST ENDPOINTS ----

// DONE---- USER ----

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

// FIXME redirecting for not authorized (EXTRA functionality) // MUST --- Create a quest >>>>> only for auth users
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

// TODO ---- Duplicates a single quest from library to authenticated user's quest lits -------
//Add from database: id=single quest id
app.post("/quests/library/:id/add", (req, res) => {
  const { message, timeNeeded, category } = req.query;
  const { id } = req.params;
  const addToUser = { createdBy: req.user._id };

  //Get template ID from req.params
  //Check if it’s a valid MongoDB ObjectId??
  //Query database for that template
  //If not found → return 404

  /* You are manually constructing a new object for UserTask.

Add:

createdBy → req.user.id

done → default false

timestamps → automatic via schema

Important concept:

You are creating a NEW document, not cloning raw database data. */
});

// FIXME MUST ---- Add quest from default library to user's list  >>>>> only for auth users
app.post("/quests/library/add", (req, res) => {
  console.log("Add quest from default library to user's list");
});

// FIXME MUST ---- Complete a quest >>>>> only for auth users
app.post("/quests/:id/complete", (req, res) => {
  console.log("Task is done");
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

// FIXME MUST ---- Display Tasks from Library, OBS! Doesn't requie authentication(returns default tasks, categories, est time) -----
//Test example: http://localhost:8080/quests/library/?category=cleaning&time=20, can filter on one category and time <= N.
// TODO Functinality:
// DONE Steps: 1. Library tasks don't require authentiacte to fetch
// DONE 2. Are stored separately from user-created tasks
//TODO 3. Allowed to duplicate each item for authenticated user by CREATING a new tasks
//DONE 4. Stays untouched in database, therefore needs to be separated in Schema: defaultTask, userTask
// DONE 5. Default tasks (libraryQuest) don't have "createdBy" field
// DONE 6. Default tasks schema: message, timeNeeded, category.
//TODO 6. After it is duplicated to users quests, shows also "done", allows to change category, timeNeeded, etc.

//Steps for creating in-build library of tasks with "see and add button" each:
//1. Seed the database with tasks with pre-filled {message, timeNeeded, category}
//2. Add "duplicate" functionality on backend: require authentication, validate template ID exists, allow copying of the 3 fields. In route, 1. Attach your authMiddleware, 2. Ensure it sets req.user.id
//3. With duplicating, automatically pass {message, timeNeeded, category} to user's field, and add "timestamp" and "createdBy" by default as when user creates a task from scratch. Use deconstruction:
//const newTask = new UserTask({
//message: template.message,
//timeNeeded: template.timeNeeded,
//category: template.category,
//createdBy: req.user._id
//})
//4.Add errorhandling on BE: 1. User not authenticated, 2.template not found, catch error in DB.
//5. Give user feedback on FE (errors and success)
//6. Display newly added task in user's list

app.get("/quests/library", async (req, res) => {
  let { category, time } = req.query;
  const query = { category, time };

  if (category) {
    query.category = category.toLowerCase();
  }
  if (time) {
    query.timeNeeded = { $lte: time };
  }

  try {
    const filteredQuests = await LibraryQuest.find(query);

    if (!filteredQuests.length) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Couldn't find quests with this filters",
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

// MUST ----- Returns all user's quests, can filter on category and time <= N) >>>>> only for auth users.
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

// FIXME (add friends only to filter) MUST ---- Friends Feed page >>>>> only for auth users( if it's a friends page, otherwise for everybody?)
// What it does:
// - req auth,
// - fetches done quests from other users
// - sorts them by done date (desc)
// - excludes current users quests
// - populates users info
app.get("/friends", authentificateUser, async (req, res) => {
  const { _id: userId } = req.user;

  //building query to find all quests made by other users with filter:
  const query = Quest.find({
    done: true,
    doneAt: { $ne: null },
    createdBy: { $ne: userId },
  })
    .sort({ doneAt: "desc" })
    .limit(20);

  try {
    //returning all friends quests filtered with query, and populating only fields we need
    const friendsQuests = await query
      .populate({ path: "createdBy", select: "name moodUrl" })
      .select("message category timeNeeded doneAt createdBy");

    //console.log(`quests: ${friendsQuests}`);
    if (!friendsQuests.length) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Couldn't find any completed quests",
      });
    }
    return res.status(200).json(friendsQuests);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error, couldn't fetch friends quests",
      error: err.message,
    });
  }
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

// FIXME add auth for users MUST ---- Delete one quest >>>>> only for authorised users for their list
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

// FIXME EXTRA ---- Edit profile >>>>> only for authorised users for their own profiles(toggle easy/hard mode, change password?)
app.patch("/profile/:id/settings", (req, res) => {
  console.log("edit profile");
});

// FIXME EXTRA ---- Edit one quest (Message, time, deadline, categories) >>>>> only for authorised users for their list

// ------ PATCH ENDPOINTS -----

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
