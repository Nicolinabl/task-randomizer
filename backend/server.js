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

//---- USER ENDPOINTS ----

//---- Register new user ----
app.post("/signup", userController.registerUser);

//---- Login with existing user ----
app.post("/login", userController.loginUser);

// ---- Delete user -----
app.delete("/users/:id", authentificateUser, userController.deleteUser);

// ------- User's Rewards Collection ---------
app.get("/rewards", authentificateUser, userController.userRewards);

// ---- Streaks ---------
app.get("/streaks", authentificateUser, userController.userStreak);

// Nice-to-have: ---- User page (shows: current strike, settings, log out, delete user, bonus points, profile picture state, user library) >>>>> only for auth users
app.get("/profile/:id", authentificateUser, userController.profileSettings);

// EXTRA ---- Edit profile, (toggle easy/hard mode, change password)
app.patch("/profile/settings", authentificateUser, userController.updateUser);

// ---- QUESTS ----

// --- Create a quest -----
app.post("/quests", authentificateUser, questController.createQuestUnAuth);

// --- Give kudos --------
app.post("/quests/:id/kudos", authentificateUser, questController.giveKudos);

// ---- Show All Quests from Library, (OBS! Doesn't requie authentication, filters on category and time <=N -----
//Test example: http://localhost:8080/quests/library/?category=cleaning&time=20
app.get("/quests/library", questController.showDefaultQuests);

// ----- Returns all user's quests, can filter on category and time <= N) -------
app.get("/quests/all", authentificateUser, questController.showUserQuests);

// ---- Duplicates a quest from library >>> only for auth users -------
app.post(
  "/quests/library/:id/add",
  authentificateUser,
  questController.duplicateQuest,
);

// ------ Check quest as done -----
app.patch(
  "/quests/:id/complete",
  authentificateUser,
  questController.checkQuestDone,
);

// ---- Delete one quest ----------
app.delete("/quests/:id", questController.deleteQuest);

// ---- User's done quests /quests/done/true
app.get(
  "/quests/done?done=true",
  authentificateUser,
  questController.filterUserQuests,
);

// ---- User's daily random quest ------
app.get("/quests/:id", authentificateUser, questController.getRandomQuest);

// Nice-to-have ---- Quests history >>>>>> only for auth users
app.get(
  "/quests/history",
  authentificateUser,
  questController.showQuestHistory,
);

// ---- Delete more than 1 quest at a time >>>>> only for authorised users for their list
app.delete(
  "/quests/delete/more",
  authentificateUser,
  questController.deleteManyQuests,
);

// ---- FRIENDS ----

// ---- Friends Feed page --------
app.get("/feed/quests", authentificateUser, friendController.getFriendsFeed);

// ---- Find a friend by ID ------
app.get("/friends/:id", authentificateUser, friendController.findUserById);

// ---- Find a friend by Name ------
app.get("/friends/:name", authentificateUser, friendController.findUserdByName);

// ---- Delete a friend ---------
app.delete("/friends/:id", friendController.removeFriend);

// -------------------------------------------

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  seedDatabase();
  console.log("Run the seedDatabase");
});
