import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export async function register(req, res) {
  try {
    const { username, password } = req.body

    const isUsed = await User.findOne({ username })

    if (isUsed)
      return res.json({
        message: "Username already used.",
      })

    const hash = await bcrypt.hash(password, 10)

    await User.create({
      username,
      password: hash,
    })

    return res.json({
      message: "Account created successfully.",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while registration",
    })
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user)
      return res.json({
        message: "Invalid credentials",
      })

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword)
      return res.json({
        message: "Incorrect Password",
      })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    )

    res.cookie("token", token, {
      httpOnly: true,
    })

    return res.json({
      username,
      role: user.role,
      message: `Welcome ${username}!`,
    })
  } catch (error) {
    console.log("Error while login")

    res.json({
      message: "Error while login",
    })
  }
}

// export async function getMe(req, res) {
//   try {
//     const user = await User.findById(req.userId)

//     if (!user)
//       return res.json({
//         message: "No such account found.",
//       })

//     return res.json({
//       username: user.username,
//       role: req.userRole,
//     })
//   } catch (error) {
//     console.log("Error while access your data")

//     return res.status(500).json({
//       message: "Server error while accessing data",
//     })
//   }
// }

export async function getMe(req, res) {
  try {
    // 1. Ищем юзера в БД
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "No such account found.",
      })
    }

    // 2. Генерируем НОВЫЙ токен с АКТУАЛЬНОЙ ролью из БД
    const token = jwt.sign(
      { id: user._id, role: user.role }, // 👈 Берем user.role, а не req.userRole!
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    )

    // 3. Обязательно обновляем куку!
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      // secure: true (включи в продакшене с HTTPS)
    })

    // 4. Возвращаем данные (структура должна совпадать с тем, что ждет фронт)
    return res.json({
      username: user.username,
      role: user.role,
      token, // (опционально, но полезно)
    })
  } catch (error) {
    console.log("Error while access your data")
    return res.status(500).json({
      message: "Server error while accessing data",
    })
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token")

    return res.json({
      message: "You have successfully logged out.",
    })
  } catch (error) {
    console.log("Error during logout: ", error)

    return res.status(500).json({
      message: "Error during logout",
    })
  }
}
