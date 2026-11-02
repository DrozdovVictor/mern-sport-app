import jwt from "jsonwebtoken"

// function checkAuth(req, res, next) {
//   try {
//     const [type, token] = (req.headers.authorization || "").split(" ")

//     if (type !== "Bearer" || !token)
//       return res.status(401).json({ message: "No access" })

//     if (token) {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)

//       req.userId = decoded.id // Создание кастомного свойства userId в объекте req для дальнейшего использования

//       next()
//     }
//   } catch (error) {
//     res.json({
//       message: "No access",
//     })
//     console.log("Error: ", error)
//   }
// }

function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "No access" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id
    req.userRole = decoded.role

    next()
  } catch (error) {
    res.json({
      message: "No access",
    })
    console.log("Error: ", error)
  }
}

export default checkAuth
