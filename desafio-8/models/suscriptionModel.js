import mongoose from "mongoose";

const suscriptionSchema = new mongoose.Schema({
  suscriberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
});

export default mongoose.model("suscription", suscriptionSchema);
