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
const MONGO_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27019/${DB_NAME}?authSource=admin`
const MONGO_URL_PROD = process.env.MONGO_URL_PROD

// Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// )
app.use(
  cors({
    origin: function (origin, callback) {
      // Разрешаем localhost и любые поддомены проекта на vercel.app
      if (
        !origin ||
        origin === "http://localhost:5173" ||
        /^https:\/\/mern-sport-.*\.vercel\.app$/.test(origin) || // Для тестовых ссылок
        origin === "https://mern-sport.vercel.app" // Для главной ссылки
      ) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
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

// local dev
// async function startServer() {
//   try {
//     await mongoose.connect(MONGO_URL)
//   } catch (error) {
//     console.error("Database connection error:", error)
//   }

//   app.listen(PORT, "0.0.0.0", () => {
//     console.log("Server started...")
//   })
// }

// startServer()

// Улучшенная функция подключения к БД для Serverless сред

// production mode
async function connectDB() {
  // Если соединение уже установлено, не подключаемся заново
  if (mongoose.connection.readyState >= 1) return

  // На Vercel используем MONGO_URL_PROD из переменных окружения, локально — localhost
  const connectionString =
    process.env.NODE_ENV === "production" ? MONGO_URL_PROD : MONGO_URL

  try {
    await mongoose.connect(connectionString)
    console.log("Database connected successfully")
  } catch (error) {
    console.error("Database connection error:", error)
  }
}

// Вызываем подключение перед обработкой запросов Express
app.use(async (req, res, next) => {
  await connectDB()
  next()
})

// ЭКСПОРТ ДЛЯ ES MODULES (Вместо app.listen)
export default app
