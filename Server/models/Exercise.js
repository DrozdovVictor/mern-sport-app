import mongoose from "mongoose"

const ExerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

export default mongoose.model("Exercise", ExerciseSchema)
