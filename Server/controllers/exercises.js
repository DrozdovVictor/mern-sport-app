import Exercise from "../models/Exercise.js"

export async function createExercise(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Неавторизован: отсутствует ID пользователя",
      })
    }

    const { title, description } = req.body

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Поле 'title' обязательно для заполнения",
      })
    }

    const newExercise = await Exercise.create({
      title: title,
      description: description,
      author: req.userId,
    })

    return res.status(201).json({
      data: newExercise,
      message: "Exercise created",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercise creating",
    })
  }
}

export async function editExercise(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Неавторизован: отсутствует ID пользователя",
      })
    }

    const { id, title, description } = req.body

    const exerciseToEdit = await Exercise.findById(id)

    if (!exerciseToEdit) {
      return res.status(404).json({
        message: "Упражнение не найдено",
      })
    }

    // if (exerciseToEdit.author !== req.userId) {
    //   return res.status(401).json({
    //     message: "Нет доступа",
    //   })
    // }

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Поле 'title' обязательно для заполнения",
      })
    }

    const validateExerciseToEdit = await Exercise.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true },
    )

    return res.json({
      data: validateExerciseToEdit,
      message: "Упражнение отредактировано",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercise editing",
    })
  }
}

export async function deleteExercise(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Неавторизован: отсутствует ID пользователя",
      })
    }

    const { id } = req.body

    if (!id) {
      return res.status(400).json({ message: "Не указан ID упражнения" })
    }

    const exerciseToDelete = await Exercise.findByIdAndDelete({
      _id: id,
      author: req.userId,
    })

    if (!exerciseToDelete) {
      return res.status(404).json({
        message: "Упражнение не найдено",
      })
    }

    return res.json({
      data: exerciseToDelete,
      message: "Упражнение удалено",
    })
  } catch (error) {
    res.status(500).json({
      message: "Error while exercise deleting",
    })

    console.log(error)
  }
}

export async function getExercises(req, res) {
  try {
    console.log(req.userId)
    if (!req.userId) {
      return res.status(401).json({
        message: "Неавторизован: отсутствует ID пользователя",
      })
    }

    const exercises = await Exercise.find({ author: req.userId })

    return res.json({
      data: exercises,
      message: "Exercises fetched",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Server error",
    })
  }
}
