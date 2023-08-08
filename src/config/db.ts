import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

// Connect to MongoDB using typescript

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
