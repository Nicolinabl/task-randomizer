import mongoose from "mongoose";
import { LibraryQuest } from "./schemas.js";
import questseeds from "./questseeds.json" with { type: "json" };

//DONE ---- Seeding database with default tasks

export const seedDatabase = async () => {
  try {
    const existingLibQuests = await LibraryQuest.countDocuments();
    if (existingLibQuests > 0) {
      console.log("Already seeded");
      return;
    }
    if (!existingLibQuests) {
      await LibraryQuest.insertMany(questseeds);
      console.log("Successfully seeded");
    }
  } catch (err) {
    return (console.log("Seeding failed"), err);
  }
};
