import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { authentificateUser } from "./authMiddleware.js";
import "dotenv/config";
import userController from "./controllers/userController.js";
import questController from "./controllers/questController.js";
import friendController from "./controllers/friendController.js";
import { seedDatabase } from "./seedLibraryQuest.js";

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
  }); // delete res.json before prod!
  //console.log("OUR ENV VAR", process.env.OUR_VAR);
});

// TODO ---- USER ENDPOINTS ----
// ---- Register new user ----
app.post("/signup", userController.registerUser);

//---- Login with existing user ----
app.post("/login", userController.loginUser);

// FIXME only user with the same id can delete itself // MUST ---- Delete user -----
app.delete("/users/:id", authentificateUser, userController.deleteUser);

// FIXME MUST---- Smiley state of mood ---- >>>> only for auth users, returns sad/happy/delighted avatars
app.get("/user/:id/state", authentificateUser, userController.userMood);

// FIXME MUST ---- User's Rewards Collection >>>>> only for auth users
app.get("/rewards", authentificateUser, userController.userRewards);

// FIXME MUST ---- Streaks >>>>> only for auth users
app.get("/streaks", authentificateUser, userController.userStreak);

// FIXME Nice+ ---- User page (shows: current strike, settings, log out, delete user, bonus points, profile picture state, user library) >>>>> only for auth users
app.get("/profile/:id", authentificateUser, userController.profileSettings);

// EXTRA ---- Edit profile >>>>> only for authorised users for their own profiles(toggle easy/hard mode, change password?)
app.patch("/profile/settings", authentificateUser, userController.updateUser);

// TODO ---- QUESTS ----
// --- Create a quest >>>>> only for auth users -----
app.post("/quests", authentificateUser, questController.createQuestUnAuth);

// FIXME add auth MUST --- Give kudos >>>>> Doesn't prevent from liking more than once - why??
app.post("/quests/:id/kudos", authentificateUser, questController.giveKudos);

// ---- Display Tasks from Library, OBS! Doesn't requie authentication(returns default tasks with categories and estimated time) ---- //Test example: http://localhost:8080/quests/library/?category=cleaning&time=20, can filter on one category and time <= N
app.get("/quests/library", questController.showDefaultQuests);

// ----- Returns all user's quests, can filter on category and time <= N) >>>>> only for auth users.
app.get("/quests/all", authentificateUser, questController.showUserQuests);

// FIXME MUST---- Duplicates a quest from library >>> only for auth users -------
app.post(
  "/quests/library/:id/add",
  authentificateUser,
  questController.duplicateQuest,
);

// FIXME ------ Check quest as done ----- >>> for auth users
app.patch(
  "/quests/:id/complete",
  authentificateUser,
  questController.checkQuestDone,
);

// FIXME add auth for users MUST ---- Delete one quest >>>>> only for authorised users for their list
app.delete("/quests/:id", questController.deleteQuest);

// FIXME add query, error handling MUST ---- User's done quests /quests/done/true
app.get(
  "/quests/done?done=true",
  authentificateUser,
  questController.filterUserQuests,
);

// FIXME add randomizing, add looking through all users quests(added from library to users database)
// MUST ---- User's daily random(!) quest >>>>> only for auth users // "/user/:userId/quests/:questId"
//NOW: only finds one from general database
app.get("/quests/:id", authentificateUser, questController.getRandomQuest);

// FIXME NICE+ ---- Quests history >>>>>> only for auth users
app.get(
  "/quests/history",
  authentificateUser,
  questController.showQuestHistory,
);

// EXTRA ---- DELETE more than 1 quest at a time >>>>> only for authorised users for their list
app.delete(
  "/quests/delete/more",
  authentificateUser,
  questController.deleteManyQuests,
);

// EXTRA ---- Edit one quest (Message, time, deadline, categories) >>>>> only for authorised users for their list
//app.patch("/quest/:id/edit")

// TODO ---- FRIENDS ----

// FIXME (add friends only to filter) MUST ---- Friends Feed page >>>>> only for auth users( if it's a friends page, otherwise for everybody?)
// What it should do:
// - req auth,
// - fetches done quests from other users
// - sorts them by done date (desc)
// - excludes current users quests
// - populates users info
app.get("/feed/quests", authentificateUser, friendController.getFriendsFeed);

// FIXME add errorhandling NICE+ ---- Find a friend by ID ------
app.get("/friends/:id", authentificateUser, friendController.findUserById);

// TODO add params, add errorhandling NICE+ ---- Find a friend by Name ------
app.get("/friends/:name", authentificateUser, friendController.findUserdByName);

// FIXME NICE+ ---- Delete a friend >>>>> only for authorised users for their feed
app.delete("/friends/:id", friendController.removeFriend);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  seedDatabase();
  console.log("Run the seedDatabase");
});
