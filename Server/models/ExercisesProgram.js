import mongoose from "mongoose"

const ExercisesProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  exercises: [
    new mongoose.Schema(
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },
        sets: { type: Number, required: true, min: 1 },
        reps: { type: Number, required: true, min: 1 },
        restTime: { type: Number, required: true, default: 60 },
        order: { type: Number, default: 0 },
      },
      { _id: false }, // Отключаем _id именно для упражнений
    ),
  ],

  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
})

export default mongoose.model("ExercisesProgram", ExercisesProgramSchema)
