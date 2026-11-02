import { Router } from "express"
import { getUsers, changeUserRole } from "../controllers/admin.js"
import checkAuth from "../middlewares/checkAuth.js"
import checkRole from "../middlewares/checkRole.js"

const adminRouter = new Router()

adminRouter.get("/get-users", checkAuth, checkRole("admin"), getUsers)

adminRouter.patch(
  "/change-user-role",
  checkAuth,
  checkRole("admin"),
  changeUserRole,
)

export default adminRouter
