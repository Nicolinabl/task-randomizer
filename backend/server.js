import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { Quest } from "./schemas";
import { User } from "./schemas";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// TODO ---- AUTHORISATION MIDDLEWARE

// DONE ---- All ENDPOINTS, temporarily ----

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  console.log({ endpoints: endpoints });
  res.json(endpoints); // FIXME delete res.json for production
});

// TODO ---- POST ENDPOINTS ----

// TODO ---- USER ----

// FIXME MUST ---- Register new user
app.post("/register", (req, res) => {
  console.log("register");
});

// FIXME MUST ---- Login with existing user
app.post("/login", (req, res) => {
  console.log("login");
});

// TODO ---- QUESTS ----

// FIXME MUST --- Create a quest >>>>> only for auth users
app.post("/quests", (req, res) => {
  res.send("Create your quest");
});

// FIXME MUST ---- Quests randomization, (filter tasks =< time available today; re-try rule; randomization session with sessionId), >>>>> only for auth users
app.post("/quests/random", (req, res) => {
  console.log("randomize quest and select by time");
});

// FIXME MUST ---- Re-try to get a new quest >>>>> only for auth users
app.post("quests/random/:sessionId/retry", (req, res) => {
  console.log("re-try");
});

// FIXME ---- Complete task >>>>> only for auth users
app.post("quests/:questid/complete", (req, res) => {
  console.log("Task is done");
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
app.post("/friends/:postid/kudos", (req, res) => {
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

// TODO ---- MAIN PAGES ----
// ---- USER ----
// FIXME ---- Smiley state of mood ---- >>>> only for auth users, returns sad/happy/delighted avatars
app.get("/user/:id/state", (req, res) => {
  /* console.log("this is your mode"); */
  res.send("User mood");
});

// FIXME Nice+ ---- User page (shows: current strike, settings, log out, delete user, bonus points, profile picture state, user library) >>>>> only for auth users
app.get("/profile/:userid", (req, res) => {
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
app.get("/friends/:friendid", (req, res) => {
  console.log("friend by id");
});

// FIXME NICE+ ---- Find a friend by :name page
app.get("/friends/:name", (req, res) => {
  console.log("friend by name");
});

// TODO ---- QUESTS ----

// FIXME MUST ---- Quests default library (returns default tasks, categories, est time)
app.get("/quests/library", (req, res) => {
  console.log("Default quest library");
});

// FIXME MUST --- User created quests (returns defaut tasks user added, user created tasks, categories, est time) >>>>> only for auth users
app.get("/quests", (req, res) => {
  res.send("This is a list of your quests");
});

// FIXME MUST ---- Users one quest >>>>> only for auth users
app.get("/user/:id/quests/:id", (req, res) => {
  console.log("My one quest of the day");
});

// FIXME MUST ---- Rewards >>>>> only for auth users
app.get("/rewards", (req, res) => {
  console.log("Your reward is here");
});

// FIXME MUST ---- Streaks >>>>> only for auth users
app.get("/streaks", (req, res) => {
  console.log("Your streak");
});

// FIXME NICE+ ---- Quests history >>>>>> only for auth users
app.get("/quests/history", (req, res) => {
  console.log("Shows how much user have done before");
});

// TODO ---- DELETE ENDPOINTS ----

// TODO ---- USER ----

// FIXME MUST ---- Delete user >>>> only for auth user
app.delete("/user/:id", (req, res) => {
  console.log("auth by id and delete user");
});

// TODO ---- QUESTS ----

// FIXME MUST ---- Delete one quest >>>>> only for authorised users for their list
app.delete("/user/:id/quests/:id", (req, res) => {
  console.log("delete test");
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
app.patch("/user/:id/quests/:id", (req, res) => {
  console.log("delete test");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
