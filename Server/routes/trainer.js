import { Router } from "express"

import { getClients } from "../controllers/trainer.js"
import checkAuth from "../middlewares/checkAuth.js"
import checkRole from "../middlewares/checkRole.js"

const trainerRouter = new Router()

trainerRouter.get("/get-clients", checkAuth, checkRole("trainer"), getClients)

export default trainerRouter
