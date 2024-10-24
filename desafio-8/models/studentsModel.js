import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courses: { type: [String]},
});

export default mongoose.model("students", studentSchema);
