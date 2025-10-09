import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("FATAL: MONGODB_URI environment variable is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("FATAL: Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
