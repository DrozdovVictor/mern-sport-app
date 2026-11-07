import { Router } from "express"
import checkAuth from "../middlewares/checkAuth.js"
import checkRole from "../middlewares/checkRole.js"
import {
  createExercisesProgram,
  editExercisesProgram,
  deleteExercisesProgram,
  getExercisesPrograms,
  getTrainerExercisesPrograms,
  getUserExercisesPrograms,
  assignProgram,
} from "../controllers/exercisesProgram.js"

const exercisesProgramRouter = new Router()

// Create
// http://localhost:5000/exercisesProgram/create
exercisesProgramRouter.post(
  "/create",
  checkAuth,
  checkRole("trainer"),
  createExercisesProgram,
)

// Edit
// http://localhost:5000/exercisesProgram/edit
exercisesProgramRouter.post(
  "/edit",
  checkAuth,
  checkRole("trainer"),
  editExercisesProgram,
)

// Delete
// http://localhost:5000/exercisesProgram/delete
exercisesProgramRouter.post(
  "/delete",
  checkAuth,
  checkRole("trainer"),
  deleteExercisesProgram,
)

// Get
// http://localhost:5000/exercisesProgram/get
exercisesProgramRouter.get(
  "/get-all",
  checkAuth,
  checkRole("admin"),
  getExercisesPrograms,
)

// User get
// http://localhost:5000/exercisesProgram/user-get
exercisesProgramRouter.get("/user-get", checkAuth, getUserExercisesPrograms)

// Trainer get
// http://localhost:5000/exercisesProgram/trainer-get
exercisesProgramRouter.get(
  "/trainer-get",
  checkAuth,
  checkRole("trainer"),
  getTrainerExercisesPrograms,
)

// Assign
// http://localhost:5000/exercisesProgram/:programId/assign
exercisesProgramRouter.patch(
  "/:programId/assign",
  checkAuth,
  checkRole("trainer"),
  assignProgram,
)

export default exercisesProgramRouter
