import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// FIXME MUST ---- Quest ----

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

    category: {
      type: String,
    },

    deadline: {
      type: Date,
      require: false,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

export const Quest = mongoose.model("Quest", questSchema);

// FIXME MUST ---- User ----

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

    moodUrl: String,
  },

  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

// FIXME ???NICE+ ---- Friend -----
