import mongoose from "mongoose";

const suscriptionSchema = new mongoose.Schema({
  suscriberId: { type: String, required: true },
  courseId: { type: String, required: true },
});

export default mongoose.model("suscription", suscriptionSchema);
