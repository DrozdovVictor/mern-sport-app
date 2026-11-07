import { Router } from "express"
import {
  createExercise,
  deleteExercise,
  editExercise,
  getExercises,
  getExercisesForAdmin,
} from "../controllers/exercises.js"
import checkAuth from "../middlewares/checkAuth.js"
import checkRole from "../middlewares/checkRole.js"

const exercisesRouter = new Router()

// Create
// http://localhost:5000/exercises/create
exercisesRouter.post("/create", checkAuth, checkRole("trainer"), createExercise)

// Edit
// http://localhost:5000/exercises/edit
exercisesRouter.post("/edit", checkAuth, checkRole("trainer"), editExercise)

// Delete
// http://localhost:5000/exercises/delete
exercisesRouter.post("/delete", checkAuth, checkRole("trainer"), deleteExercise)

// Get
// http://localhost:5000/exercises/get
exercisesRouter.get("/get", checkAuth, getExercises)

exercisesRouter.get(
  "/get-all",
  checkAuth,
  checkRole("admin"),
  getExercisesForAdmin,
)

export default exercisesRouter
