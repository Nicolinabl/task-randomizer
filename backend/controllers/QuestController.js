import mongoose from "mongoose";

import { Quest } from "../schemas.js";

import { LibraryQuest } from "../schemas.js";
import quests from "../quests.json";

import "dotenv/config";

// ---- All Quest routes: ----

// FIXME // MUST --- Create a quest >>>>> only for auth users
// add: redirecting for not authorized (EXTRA functionality)
const createQuestUnAuth = async (req, res) => {
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
};

// FIXME add auth MUST --- Give kudos >>>>> Doesn't prevent from liking more than once - why??
const giveKudos = async (req, res) => {
  //console.log("Give kudos");
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, response: "Quest id is invalid" });
  }

  try {
    const update = { $inc: { kudos: 1 }, $push: { kudosByUser: userId } };
    const options = { new: true, runValidators: true };

    const addKudos = await Quest.findByIdAndUpdate(
      { _id: id, kudosByUser: { $ne: userId } },
      update,
      options,
    );

    if (!addKudos) {
      return res.status(400).json({
        succes: false,
        message: "Can't give cudos more than once to the same quest",
      });
    }
    return res.status(200).json(addKudos);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Couldn't add kudos, try again",
      error: err.errors,
    });
  }
};

// FIXME MUST ---- Display Tasks from Library, OBS! Doesn't requie authentication(returns default tasks with categories and estimated time) -----
//Test example: http://localhost:8080/quests/library/?category=cleaning&time=20, can filter on one category and time <= N
const showDefaultQuests = async (req, res) => {
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
};

// ----- Returns all user's quests, can filter on category and time <= N) >>>>> only for auth users.
const showUserQuests = async (req, res) => {
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
    const filteredQuests = await Quest.find(query).populate({
      path: "createdBy",
    });

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
};

// TODO add randomizing, add looking through all users quests
// MUST ---- User's daily random(!) quest >>>>> only for auth users // "/user/:userId/quests/:questId"
//NOW: only finds one from general database
const getRandomQuest = async (req, res) => {
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
};

// TODO ---- DUPLICATE QUEST FROM LIBRARY
//  ----- Duplicates a single quest from library to authenticated user's quest lits -------
//Add from database: id=single quest id //ADD AUTH
// FIXME Functinality:
// DONE Steps: 1. Library tasks don't require authentiacte to fetch
// DONE 2. Are stored separately from user-created tasks
//FIXME 3. Allowed to duplicate each item for authenticated user by CREATING a new tasks
//DONE 4. Stays untouched in database, therefore needs to be separated in Schema: defaultTask, userTask
// DONE 5. Default tasks (libraryQuest) don't have "createdBy" field
// DONE 6. Default tasks schema: message, timeNeeded, category.
//FIXME 6. After it is duplicated to users quests, shows also "done", allows to change category, timeNeeded, etc.

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

const duplicateQuest = async (req, res) => {
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
};

// FIXME and query, error handling MUST ---- User's done quests /quests/done/true
const filterUserQuests = (req, res) => {
  const done = req.params.done;
  const questsDone = quests.filter((item) => item.done === done);
  res.json(questsDone);
};

// FIXME ------ Check quest as done ----- >>> only for auth users
const checkQuestDone = async (req, res) => {
  // get quest id from the url
  const { id } = req.params; // get the done value (true or false), this will be sent from the frontend when quest is checked or not

  const { done } = req.body; // check if the id is valid

  const updateData = { done, doneAt: done ? new Date() : null };

  if (typeof done !== "Boolean") {
    return res
      .status(400)
      .json({ succes: false, message: "Invalid type of data" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid quest ID" });
  }

  try {
    // Find the quest in the database and update its done field
    const quest = await Quest.findOneAndUpdate(
      { _id: id, createdBy: req.user._id }, // ensures user can only update their own quests
      updateData,
      { new: true, runValidators: true },
    );

    if (!quest) {
      return res
        .status(404)
        .json({ success: false, message: "Quest not found or unauthorized" });
    }

    res.status(200).json({ success: true, response: quest });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errors: err.errors,
    });
  }
};

// FIXME add auth for users MUST ---- Delete one quest >>>>> only for authorised users for their list
const deleteQuest = async (req, res) => {
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
};

//FIXME NICE+ ---- User completes task too fast confirmation >>>>> only for auth users
const confirmCompletion = async (req, res) => {
  console.log("Do not cheat, ok?");
};

// FIXME MUST ---- ??? is it post? Re-try to get a new quest >>>>> only for auth users
const getNewQuest = async (req, res) => {
  console.log("re-try");
};

// FIXME EXTRA ---- Add actual time >>>>> only for auth users
const changeTime = async (req, res) => {
  console.log("Add actual time");
};

// FIXME NICE+ ---- Skip a day of quests >>>>> only for auth users
const skipDay = async (req, res) => {
  console.log("Skip a day");
};

// FIXME NICE+ ---- Repetitive quests >>>>> only for auth users

// FIXME NICE+ ---- Quests history >>>>>> only for auth users
const showQuestHistory = async (req, res) => {
  console.log("Shows how much user have done before");
};

// FIXME EXTRA ---- DELETE more than 1 quest at a time >>>>> only for authorised users for their list
const deleteManyQuests = async (req, res) => {
  console.log("Delete user's quests");
};

export default {
  createQuestUnAuth,
  giveKudos,
  showDefaultQuests,
  showUserQuests,
  filterUserQuests,
  checkQuestDone,
  deleteQuest,
  getRandomQuest,
  duplicateQuest,
  showQuestHistory,
  deleteManyQuests,
};
