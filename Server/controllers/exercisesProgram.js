import User from "../models/User.js"
import ExercisesProgram from "../models/ExercisesProgram.js"

export async function createExercisesProgram(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const { title, description, exercises } = req.body

    const newExercisesProgram = await ExercisesProgram.create({
      title,
      description,
      author: req.userId,
      exercises,
    })

    return res.status(201).json({
      data: newExercisesProgram,
      message: "Exercises program created",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercises program creating",
    })
  }
}

export async function editExercisesProgram(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const { id, title, description, exercises } = req.body

    const exercisesProgramToEdit = await ExercisesProgram.findById(id)

    if (!exercisesProgramToEdit) {
      return res.status(404).json({
        message: "The exercise program was not found",
      })
    }

    const validateExercisesProgramToEdit =
      await ExercisesProgram.findOneAndUpdate(
        { _id: id },
        { title, description, exercises },
        { new: true },
      )

    return res.status(201).json({
      data: validateExercisesProgramToEdit,
      message: "Exercise program edited",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercises program edited",
    })
  }
}

export async function deleteExercisesProgram(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const { id } = req.body

    const exercisesProgramToDelete = await ExercisesProgram.findByIdAndDelete({
      _id: id,
      author: req.userId,
    })

    return res.status(201).json({
      data: exercisesProgramToDelete,
      message: "Exercises program deleted",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercises program deleting",
    })
  }
}

export async function getUserExercisesPrograms(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const userExercisesPrograms = await ExercisesProgram.find({
      assignedTo: req.userId,
    })
      .populate("exercises.exercise")
      .populate("author", "username")

    return res.json({
      exercisesPrograms: userExercisesPrograms,
      message: "Exercises programs getting successful",
    })
  } catch (error) {
    console.log(error)

    return res.json({
      message: "Error while getting your exercises programs",
    })
  }
}

export async function getTrainerExercisesPrograms(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const exercisesPrograms = await ExercisesProgram.find({
      author: req.userId,
    }).populate("exercises.exercise")

    return res.status(201).json({
      data: exercisesPrograms,
      message: "Exercises programs for trainer gotted",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercise getting",
    })
  }
}

export async function assignProgram(req, res, next) {
  try {
    const { clientIds } = req.body
    const programId = req.params.programId

    // ─────────────────────────────────────────────
    // ШАГ 1: Валидация входа
    // ─────────────────────────────────────────────
    if (!Array.isArray(clientIds)) {
      return res.status(400).json({ message: "clientIds must be an array" })
    }

    // ─────────────────────────────────────────────
    // ШАГ 2: Найти программу
    // ─────────────────────────────────────────────
    const program = await ExercisesProgram.findById(programId)
    if (!program) {
      return res.status(404).json({ message: "Program not found" })
    }

    // ─────────────────────────────────────────────
    // ШАГ 3: Ownership — программа принадлежит этому тренеру?
    // ─────────────────────────────────────────────
    if (program.author.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can only assign your own programs",
      })
    }

    // ─────────────────────────────────────────────
    // ШАГ 4: Проверить, что все клиенты существуют
    //         И принадлежат этому тренеру
    // ─────────────────────────────────────────────
    const clients = await User.find({
      _id: { $in: clientIds },
      role: "client",
      trainer: req.userId,
    })

    if (clients.length !== clientIds.length) {
      return res.status(400).json({
        message: "Some clients not found, not clients, or not yours",
      })
    }

    // ─────────────────────────────────────────────
    // ШАГ 5: Обновить assignedTo
    //         $addToSet — добавляет, если ещё нет (не дублирует)
    // ─────────────────────────────────────────────
    // const updatedProgram = await ExercisesProgram.findByIdAndUpdate(
    //   programId,
    //   { $addToSet: { assignedTo: { $each: clientIds } } },
    //   { new: true },
    // )

    const updatedProgram = await ExercisesProgram.findByIdAndUpdate(
      programId,
      { assignedTo: clientIds }, // <--- ЗАМЕНЯЕМ ВЕСЬ МАССИВ
      { new: true },
    )

    res.json({
      updatedProgram,
      message: "Program assigned successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while assign exercises program",
    })
  }
}
