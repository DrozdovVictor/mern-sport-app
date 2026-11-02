import User from "../models/User.js"

export async function getUsers(req, res, next) {
  try {
    const users = await User.find().select("username role")

    return res.json({ users })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function changeUserRole(req, res, next) {
  try {
    const { id, role } = req.body

    // 2. Валидация: проверяем, что роль вообще существует
    const validRoles = ["client", "trainer", "admin"]
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Неверная роль" })
    }

    // 3. Защита: админ не может понизить сам себя
    if (req.userId === id && role !== "admin") {
      return res
        .status(400)
        .json({ message: "Вы не можете снять с себя права администратора" })
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
      return res.status(404).json({ message: "Пользователь не найден" })
    }

    // 6. Возвращаем обновленного пользователя
    res.json({ updatedUser })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
