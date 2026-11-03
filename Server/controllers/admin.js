import User from "../models/User.js"

export async function getUsers(req, res) {
  try {
    const users = await User.find().select("username role")

    return res.json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while getting users",
    })
  }
}

export async function changeUserRole(req, res) {
  try {
    const { id, role } = req.body

    // 2. Валидация: проверяем, что роль вообще существует
    const validRoles = ["client", "trainer", "admin"]
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Incorrect role" })
    }

    // 3. Защита: админ не может понизить сам себя
    if (req.userId === id && role !== "admin") {
      return res
        .status(400)
        .json({ message: "You cannot revoke your administrator rights" })
    }

    // 4. Обновляем пользователя
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
        runValidators: true, // 👈 Обязательно, чтобы Mongoose проверил enum в схеме
      },
    ).select("username role")

    // 5. Проверяем, нашли ли пользователя
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    // 6. Возвращаем обновленного пользователя
    res.json({ updatedUser, message: "User role has been changed" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while changing user role",
    })
  }
}
