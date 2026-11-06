import type { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"

import Navbar from "./Navbar"
import { chooseTrainer } from "../../redux/slices/clientSlice"
import { getInitials } from "../../utils/getInitials"

function ClientDashboard() {
  const { username } = useSelector((state: RootState) => state.auth)
  const { exercisesPrograms } = useSelector(
    (state: RootState) => state.exercisesProgram,
  )
  const { trainers, myTrainer } = useSelector(
    (state: RootState) => state.client,
  )

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Приветственный блок */}
        <h1 className="text-3xl font-bold text-gray-900">Hi, {username}!</h1>
        {/* <p className="text-gray-500 mt-2">Вот твой прогресс за неделю</p> */}
        {/* Статистические карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">🏋️</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">4</p>
            <p className="text-sm text-gray-500 mt-1">Тренировок за неделю</p>
          </div> */}
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">🏆</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">12 500 кг</p>
            <p className="text-sm text-gray-500 mt-1">Общий вес за неделю</p>
          </div> */}
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">📅</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">47</p>
            <p className="text-sm text-gray-500 mt-1">Дней в клубе</p>
          </div> */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">📋</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {exercisesPrograms.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Exercises{" "}
              {exercisesPrograms.length === 1 ? "program" : "programs"}
            </p>
          </div>
        </div>
        {/* Программы упражнений */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Exercises programs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exercisesPrograms.map((program) => {
              return (
                <div
                  key={program._id}
                  className="relative border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 mt-3">
                    {program.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {program.exercises.length}{" "}
                    {program.exercises.length === 1 ? "exercise" : "exercises"}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {trainers.map((trainer) => {
            if (trainer._id === myTrainer?._id) {
              return (
                <div
                  key={trainer._id}
                  className="bg-indigo-50 rounded-2xl border-2 border-indigo-500 shadow-sm p-6 flex flex-col justify-center items-center text-center relative"
                >
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Your trainer
                  </span>
                  <div
                    aria-label="The trainer's avatar"
                    className="w-20 h-20 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center text-2xl font-bold"
                  >
                    {getInitials(trainer.username)}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mt-4">
                    {trainer.username}
                  </p>
                  {/* <p className="text-sm text-gray-500 mt-1">maria@mail.com</p> */}
                </div>
              )
            } else
              return (
                <div
                  key={trainer._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <div
                    aria-label="The trainer's avatar"
                    className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold"
                  >
                    {getInitials(trainer.username)}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mt-4">
                    {trainer.username}
                  </p>
                  {/* <p className="text-sm text-gray-500 mt-1">alex@mail.com</p> */}
                  <button
                    type="button"
                    className="mt-6 w-full px-4 py-2.5 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch(chooseTrainer({ trainerId: trainer._id }))
                    }}
                  >
                    Choose
                  </button>
                </div>
              )
          })}
        </div>
        {/* Прогресс за неделю */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Прогресс за неделю
          </h2>
          <div className="h-75 bg-gray-50 rounded-lg mt-4 flex items-center justify-center">
            <span className="text-sm text-gray-400">
              Здесь будет график (Recharts)
            </span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ClientDashboard
