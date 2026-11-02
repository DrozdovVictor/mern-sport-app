import User from "../models/User.js"

export async function getClients(req, res, next) {
  try {
    const clients = await User.find({
      trainer: req.userId,
      role: "client",
    })
      .select("username")
      // Подтягиваем программы для каждого клиента
      .populate({
        path: "assignedPrograms",
        select: "title _id -assignedTo", // Оставляем только title и _id
      })

    res.json({
      clients,
    })
  } catch (error) {
    next(error)
  }
}
