import { Router } from "express"
import { register, login, getMe, logout } from "../controllers/auth.js"
import checkAuth from "../middlewares/checkAuth.js"

const authRouter = new Router()

// Register
// http://localhost:5000/auth/register
authRouter.post("/register", register)

// Login
// http://localhost:5000/auth/login
authRouter.post("/login", login)

// Login
// http://localhost:5000/auth/logout
authRouter.post("/logout", logout)

// Get me
// http://localhost:5000/auth/me
authRouter.get("/me", checkAuth, getMe)

export default authRouter
