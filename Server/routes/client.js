import { Router } from "express"

import {
  getTrainers,
  getMyTrainer,
  chooseTrainer,
} from "../controllers/client.js"
import checkAuth from "../middlewares/checkAuth.js"

const clientRouter = new Router()

clientRouter.get("/get-trainers", checkAuth, getTrainers)
clientRouter.get("/get-my-trainer", checkAuth, getMyTrainer)
clientRouter.patch("/choose-trainer", checkAuth, chooseTrainer)

export default clientRouter
