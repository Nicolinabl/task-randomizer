import mongoose from "mongoose";
import { LibraryQuest } from "./schemas.js";
import questseeds from "./questseeds.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

/* const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";

console.log("Starting server... With Mongo URL:", mongoUrl); */

mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

//TODO add seeding database with default tasks
/* const seedDatabase = async () => {
  await LibraryQuest.deleteMany(); //deletes everything we have in database

  questseeds.insertMany((questseeds) => {
    //inserts in bulk quests library
    new LibraryQuest(questseeds).save();
  });
};
await seedDatabase(); */

require("dotenv").config(); // If you use a .env file for your Mongo URI

const defaultLibrary = [
  { message: "Drink 500ml of water", timeNeeded: "2 mins", category: "Health" },
  {
    message: "10-minute morning stretch",
    timeNeeded: "10 mins",
    category: "Fitness",
  },
  {
    message: "Write down 3 goals for today",
    timeNeeded: "5 mins",
    category: "Productivity",
  },
  {
    message: "Clean your workspace",
    timeNeeded: "15 mins",
    category: "Organization",
  },
];

const seedDatabase = async () => {
  console.log("Old library cleared.");

  try {
    // 1. Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost/final-project",
    );
    console.log("Connected to MongoDB...");

    // 2. Clear existing default tasks (prevents duplicates if you run this twice)
    await DefaultTask.deleteMany({});

    // 3. Insert the new tasks
    await DefaultTask.insertMany(defaultLibrary);
    console.log(`${defaultLibrary.length} default tasks inserted!`);

    // 4. Close connection
    mongoose.connection.close();
    console.log("Connection closed. Seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
