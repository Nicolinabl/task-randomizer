import mongoose from "mongoose";
import { Quest } from "../schemas.js";
import { User } from "../schemas.js";

import "dotenv/config";

// ---- All friends routes -----

// TODO ---- FRIENDS FEED ----

// FIXME (add friends only to filter) MUST ---- Friends Feed page >>>>> only for auth users( if it's a friends page, otherwise for everybody?)
// What it does:
// - req auth,
// - fetches done quests from other users
// - sorts them by done date (desc)
// - excludes current users quests
// - populates users info
const getFriendsFeed = async (req, res) => {
  const { _id: userId } = req.user;

  //building query to find all quests made by other users with filter:
  const query = Quest.find({
    done: true,
    doneAt: { $ne: null },
    createdBy: { $ne: userId },
  })
    .sort({ doneAt: -1 })
    .limit(20);

  try {
    //returning all friends quests filtered with query, and populating only fields we need
    const friendsQuests = await query
      .populate({ path: "createdBy", select: "name moodUrl" })
      .select("message category timeNeeded doneAt createdBy kudos");

    //console.log(`quests: ${friendsQuests}`);
    if (!friendsQuests.length) {
      return res.status(200).json({
        success: true,
        response: [],
        message: "Nobody completed quests yet",
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
};

// FIXME NICE+ ---- Find a friend bi ID page
const findUserById = async (req, res) => {
  const friend = await User.findById(req.params.id); //search through users ids in database?
  res.json(friend);
};

// TODO NICE+ ---- Find a friend by :name page
const findUserdByName = async (req, res) => {
  const friend = await User.findOne(req.params.name); //search through users names in database?
  res.json(friend);
};

// FIXME NICE+ ---- Remove a friend >>>>> only for authorised users for their feed
const removeFriend = async (req, res) => {
  console.log("delete friend");
};

export default {
  getFriendsFeed,
  findUserById,
  findUserdByName,
  removeFriend,
};
