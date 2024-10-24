import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function dbConnection() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((connection) => console.log("Connected to MongoDB!"))
    .catch((err) => {
      console.error("Could not connect to MongoDB: ", err.message);
    });
}
