import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("FATAL: Database connection failed:", error.message);
    // Exit the process with a "failure" code
    process.exit(1);
  }
};

export default connectDB;
