import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return;

  if (isConnected) {
    console.log("isConnected", isConnected);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,
    });

    isConnected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
