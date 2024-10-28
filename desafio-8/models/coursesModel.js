import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  students: { type: [Object] },
});

export default mongoose.model("courses", courseSchema);
