import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  students: { type: [String] },
});

export default mongoose.model("courses", courseSchema);
