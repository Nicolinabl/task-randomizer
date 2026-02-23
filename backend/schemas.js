import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";
import { timeStamp } from "console";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// FIXME ??add smth else MUST ---- User's Quest Model ----

const questSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      minLength: 2,
    },

    timeNeeded: {
      type: Number,
      require: true,
    },

    category: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    deadline: {
      type: Date,
      require: false,
    },

    done: {
      type: Boolean,
      default: false,
    },

    doneAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true },
);

export const Quest = mongoose.model("Quest", questSchema);

// FIXME add smth else?? MUST ---- User Model ----

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 24,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    registerDate: {
      type: Date,
      default: () => new Date(),
    },

    streak: {
      type: Number,
      default: 0,
    },

    todayTaskCompleted: {
      type: Boolean,
      default: false,
    },

    lastTaskCompleted: {
      type: Date,
    },

    moodUrl: {
      type: String,
      default: "https://static.productionready.io/images/smiley-cyrus.jpg",
    },

    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex"),
    },
  },

  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

// ---- Library Quest Model -----

const libraryQuest = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      minLength: 2,
    },

    timeNeeded: {
      type: Number,
      require: true,
    },

    category: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
  },

  { timestamps: true },
);

export const LibraryQuest = mongoose.model("LibraryQuest", libraryQuest);

// ???---- Session ----
// Schema to randomize and sessions?

// ???NICE+ ---- Friends -----
//When adding a friend?
