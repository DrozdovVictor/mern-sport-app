import User from "../models/User.js"

export async function getTrainers(req, res) {
  try {
    const trainers = await User.find({ role: "trainer" }).select("username")

    return res.json({ trainers })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while get trainers",
    })
  }
}

export async function getMyTrainer(req, res) {
  try {
    // 1. Ищем юзера и подтягиваем только username тренера
    const user = await User.findById(req.userId).populate("trainer", "username")

    // 2. Проверяем, существует ли сам юзер (на случай удаления аккаунта)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // 3. Если тренера нет — возвращаем null (это нормальная ситуация)
    if (!user.trainer) {
      return res.json({ trainer: null })
    }

    // 4. Возвращаем данные тренера
    return res.json({
      trainer: {
        _id: user.trainer._id,
        username: user.trainer.username,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while getting my trainer",
    })
  }
}

export async function chooseTrainer(req, res) {
  try {
    const { trainerId } = req.body

    // 1. Валидация входа
    if (!trainerId) {
      return res.status(400).json({ message: "trainerId is required" })
    }

    // 2. Проверяем, что этот пользователь существует и он ТРЕНЕР
    const trainer = await User.findById(trainerId)
    if (!trainer || trainer.role !== "trainer") {
      return res.status(400).json({ message: "Invalid trainer selected" })
    }

    // 3. Обновляем текущего клиента
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { trainer: trainerId },
      { new: true },
    )
      .populate("trainer")
      .select("trainer") // Обязательно убираем пароль!

    res.json({
      trainer: {
        _id: updatedUser.trainer._id,
        username: updatedUser.trainer.username,
      },
      message: `You have chosen ${updatedUser.trainer.username} as your trainer`,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error while choosing trainer",
    })
  }
}
