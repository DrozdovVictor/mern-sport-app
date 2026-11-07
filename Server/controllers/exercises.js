import Exercise from "../models/Exercise.js"

export async function createExercise(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const { title, description } = req.body

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "The ‘title’ field is required",
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
        message: "Unauthorized: user ID is missing",
      })
    }

    const { id, title, description } = req.body

    const exerciseToEdit = await Exercise.findById(id)

    if (!exerciseToEdit) {
      return res.status(404).json({
        message: "The exercise was not found",
      })
    }

    // if (exerciseToEdit.author !== req.userId) {
    //   return res.status(401).json({
    //     message: "Нет доступа",
    //   })
    // }

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "The ‘title’ field is required",
      })
    }

    const validateExerciseToEdit = await Exercise.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true },
    )

    return res.json({
      data: validateExerciseToEdit,
      message: "The exercise has been edited",
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
        message: "Unauthorized: user ID is missing",
      })
    }

    const { id } = req.body

    if (!id) {
      return res
        .status(400)
        .json({ message: "The exercise ID is not specified" })
    }

    const exerciseToDelete = await Exercise.findByIdAndDelete({
      _id: id,
      author: req.userId,
    })

    if (!exerciseToDelete) {
      return res.status(404).json({
        message: "The exercise was not found",
      })
    }

    return res.json({
      data: exerciseToDelete,
      message: "The exercise has been deleted",
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
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const exercises = await Exercise.find({ author: req.userId })

    return res.json({
      data: exercises,
      message: "Exercises gotted",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercise getting",
    })
  }
}

export async function getExercisesForAdmin(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: user ID is missing",
      })
    }

    const exercises = await Exercise.find()

    return res.json({
      data: exercises,
      message: "Exercises gotted",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Error while exercise getting",
    })
  }
}
