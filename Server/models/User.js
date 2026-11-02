import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["client", "trainer", "admin"],
      default: "client",
      required: true,
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, id: false },
)

// Создаем виртуальное поле, которого нет в БД, но Mongoose умеет его заполнять
userSchema.virtual("assignedPrograms", {
  ref: "ExercisesProgram", // Имя модели программы
  localField: "_id", // Поле в User
  foreignField: "assignedTo", // Поле в Программе
})

// Хук, который срабатывает ПЕРЕД удалением пользователя
userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()["_id"] // Получаем ID удаляемого юзера

  // Достаем модель программ (используем mongoose.model, чтобы избежать циклического импорта)
  const ExercisesProgram = mongoose.model("ExercisesProgram")

  // Удаляем ID этого пользователя из массива assignedTo во ВСЕХ программах
  await ExercisesProgram.updateMany(
    { assignedTo: userId }, // Ищем программы, где он есть
    { $pull: { assignedTo: userId } }, // 👈 $pull — вырывает элемент из массива
  )

  next()
})

export default mongoose.model("User", userSchema)
