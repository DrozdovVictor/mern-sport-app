import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

// Routers
import authRouter from "./routes/auth.js"
import exercisesRouter from "./routes/exercises.js"
import exercisesProgramRouter from "./routes/exercisesProgram.js"
import clientRouter from "./routes/client.js"
import trainerRouter from "./routes/trainer.js"
import adminRouter from "./routes/admin.js"

const app = express()
dotenv.config()

// Constatns
const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// )
app.use(
  cors({
    origin: "http://localhost:5173", // Укажите ТОЧНЫЙ адрес вашего фронтенда
    credentials: true, // Разрешает принимать и отправлять куки
  }),
)
// Подключаем cookie-parser
// Можно передать секретную строку в cookieParser('SECRET_KEY') для подписанных кук (Signed Cookies)
app.use(cookieParser())
app.use(express.json())

// Routes
// http://localhost:5000/
app.use("/auth", authRouter)
app.use("/exercises", exercisesRouter)
app.use("/exercisesProgram", exercisesProgramRouter)
app.use("/client", clientRouter)
app.use("/trainer", trainerRouter)
app.use("/admin", adminRouter)

// // app.js после всех роутов
// app.use((err, req, res, next) => {
//   console.error(err)
//   res.status(err.status || 500).json({ message: err.message || "Server error" })
// })

app.get("/", (req, res) => {
  res.json("All is fine!")
})

async function startServer() {
  try {
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27019/${DB_NAME}?authSource=admin`,
    )
  } catch (error) {
    console.error("Database connection error:", error)
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started...")
  })
}

startServer()
