import mongoose from "mongoose";

import { Quest, User } from "../schemas.js";

import bcrypt from "bcrypt-nodejs";

import "dotenv/config";
import { response } from "express";

// ---- All user routes ----

//✅ ---- Register new user ----
const registerUser = async (req, res) => {
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
};

//✅ ---- Login with existing user ----
const loginUser = async (req, res) => {
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
};

// FIXME only user with the same id can delete itself // MUST ---- Delete user -----
const deleteUser = async (req, res) => {
  //console.log("auth by id and delete user");
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: `Couldn't find user with id ${id}` });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        succes: false,
        message: `User with id ${id} doesn't exist or was permanently deleted`,
      });
    }
    return res.status(200).json({
      succes: true,
      response: [user.email, user.name],
      message: "User was permanently deleted",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ succes: false, message: "Server error", error: err.message });
  }
};

// FIXME EXTRA ---- Edit profile >>>>> only for authorised users for their own profiles(toggle easy/hard mode, change password?)
const updateUser = async (req, res) => {
  console.log("edit profile");
};

// TODO ----- REWARDS&STRIKES ------

// FIXME MUST ---- User's Rewards Collection >>>>> only for auth users
const userRewards = async (req, res) => {
  res.send("Your reward is here");
};

// FIXME MUST ---- Streaks >>>>> only for auth users
const userStreak = async (req, res) => {
  //console.log("Your streak");

  try {
    const completedQuests = await Quest.find({ done: true }).sort({
      doneAt: -1,
    });

    if (completedQuests.length === 0) {
      return res.status(204).json({
        succes: true,
        message: "There are no completed quests yet",
        streak: 0,
      });
    }
    //console.log(completedQuests);
    let streak = 0;
    let today = new Date().setHours(0, 0, 0, 0);
    //console.log(today);
    let checkDate = today;
    //console.log(checkDate);

    for (let i = 0; i < completedQuests.length; i++) {
      let lastQuest = completedQuests[i];
      let lastQuestDate = new Date(lastQuest.doneAt).setHours(0, 0, 0, 0);
      //console.log(lastQuestDate);

      if (checkDate - lastQuestDate > 86400000) {
        //number is over one day in milisec, streak broken
        break;
      }
      if (
        checkDate - lastQuestDate === 86400000 ||
        lastQuestDate === checkDate
      ) {
        streak++;
        checkDate -= 86400000;
        //console.log(checkDate);
      }
      //console.log(checkDate - lastQuestDate);
    }

    return res.status(200).json({ success: true, response: streak });
  } catch (err) {
    return res.status(500).json({
      succes: false,
      message: "Somethng went wrong at the server",
      error: err.errors,
    });
  }
};

// FIXME Nice+ ---- User page (shows: current strike, settings, log out, delete user, bonus points, profile picture state, user library) >>>>> only for auth users
const profileSettings = async (req, res) => {
  /* console.log("user info page"); */
  res.send("User profle");
};

// TODO ---- PUNISHMENTS ----
// EXTRA ---- Send an embarrassing message to smbdy >>>>> only for auth users
/* app.post("/punishment/embarrass-me", (req, res) => {
  console.log("Welp it didn't go well");
}); */

// EXTRA ---- Lock instagram or tiktok for an hour >>>>> only for auth users
/* app.post("/punishment/lock", (req, res) => {
  console.log("def too much");
});
 */

export default {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  //userMood,
  userRewards,
  userStreak,
  profileSettings,
};
