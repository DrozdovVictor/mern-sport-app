import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { deleteExercise } from "../../redux/slices/exercisesSlice"
import { deleteExercisesProgram } from "../../redux/slices/exersisesProgramSlice"

import { Link } from "react-router"
import Navbar from "./Navbar"
import AssignProgramModal from "../AssignProgramModal"
import { getInitials } from "../../utils/getInitials"

interface Program {
  _id: string
  assignedTo: string[]
}

function TrainerDashboard() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const { username } = useSelector((state: RootState) => state.auth)
  const { clients } = useSelector((state: RootState) => state.trainer)
  const exercises = useSelector((state: RootState) => state.exercises.exercises)
  const { exercisesPrograms } = useSelector(
    (state: RootState) => state.exercisesProgram,
  )

  function handleExerciseDelete(id: string) {
    try {
      dispatch(deleteExercise(id))
    } catch (error) {
      console.log(error)
    }
  }

  function handleExercisesProgramDelete(id: string) {
    try {
      dispatch(deleteExercisesProgram(id))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Приветственный блок */}
        <h1 className="text-3xl font-bold text-gray-900">Hi, {username}!</h1>
        {/* <p className="text-gray-500 mt-2">
          Управляй своими программами и клиентами
        </p> */}
        {/* Статистические карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">👥</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {clients.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">My clients</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">💪</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {exercises.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Exercises in the base</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">📚</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {exercisesPrograms.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">My programs</p>
          </div>
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">📅</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">5</p>
            <p className="text-sm text-gray-500 mt-1">Назначено за неделю</p>
          </div> */}
        </div>
        {/* Основной блок */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"> */}
        {/* Левая колонка */}
        {/* <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Последняя активность
            </h2>
            <div className="mt-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  👤
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Клиент Иван завершил тренировку
                  </p>
                  <p className="text-xs text-gray-500 mt-1">1 час назад</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  📋
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Назначена программа: Full Body
                  </p>
                  <p className="text-xs text-gray-500 mt-1">3 часа назад</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-100 last:border-0 pb-4 mb-4 last:mb-0">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  💪
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Добавлено упражнение: Становая тяга
                  </p>
                  <p className="text-xs text-gray-500 mt-1">вчера</p>
                </div>
              </div>
            </div>
          </div> */}
        {/* Правая колонка */}
        {/* <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Быстрые действия
            </h2>
            <div className="mt-4">
              <a
                href="/programs/create"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>➕</span>
                <span className="text-sm font-medium text-gray-700">
                  Создать упражнение
                </span>
              </a>
              <a
                href="/programs/create"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>➕</span>
                <span className="text-sm font-medium text-gray-700">
                  Создать программу
                </span>
              </a>
              <a
                href="/exercises"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>📚</span>
                <span className="text-sm font-medium text-gray-700">
                  Мои упражнения
                </span>
              </a>
              <a
                href="/clients"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>👥</span>
                <span className="text-sm font-medium text-gray-700">
                  Мои клиенты
                </span>
              </a>
              <a
                href="/profile"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>👤</span>
                <span className="text-sm font-medium text-gray-700">
                  Профиль
                </span>
              </a>
            </div>
          </div> */}
        {/* </div> */}
        {/* Программы упражнений */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Exercises programs
            </h2>
            <Link
              to="/exercises-program"
              aria-label="Create exercises program"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
          </div>

          {exercisesPrograms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {exercisesPrograms.map((program) => {
                return (
                  <div
                    key={program._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col"
                  >
                    {/* Шапка карточки */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl shrink-0">
                          📋
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {program.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {program.exercises.length}{" "}
                            {program.exercises.length === 1
                              ? "exercise"
                              : "exercises"}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {program.assignedTo.length}{" "}
                            {program.assignedTo.length === 1
                              ? "client"
                              : "clients"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          to="/exercises-program"
                          state={{
                            id: program._id,
                            title: program.title,
                            description: program?.description,
                            exercises: program.exercises,
                          }}
                          aria-label="Edit"
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          aria-label="Delete the exercises program"
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            handleExercisesProgramDelete(program._id)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M10 11v6M14 11v6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Описание */}
                    {program.description && (
                      <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                        {program.description}
                      </p>
                    )}
                    {/* Футер карточки */}
                    <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedProgram(program)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition-colors"
                      >
                        <span>👥</span>
                        Assign
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-sm">
                You don't have any exercises programs yet
              </p>
            </div>
          )}
        </div>
        {/* Мои упражнения */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              My exercises
            </h2>
            <Link
              to="/create-or-edit-exercise"
              aria-label="See all exercises"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
          </div>
          {exercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {exercises.map((exercise) => {
                return (
                  <div
                    key={exercise._id ?? exercise.title}
                    className="relative border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
                        💪
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to="/create-or-edit-exercise"
                          state={{ exercise }}
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4.5 h-4.5"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </Link>

                        <button
                          type="button"
                          aria-label={`Delete ${exercise.title}`}
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            handleExerciseDelete(exercise._id)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4.5 h-4.5"
                          >
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M10 11v6M14 11v6" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-900 mt-3">
                      {exercise.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {exercise.description}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-sm">
                You don't have any exercises yet
              </p>
            </div>
          )}
        </div>

        {/* Мои клиенты */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My clients</h2>
            {/* <span className="text-sm text-gray-500">Всего: 4</span> */}
          </div>

          {/* Поиск */}
          {/* <div className="relative mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Поиск клиента..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            // TODO: логика поиска клиентов
          />
        </div> */}

          {/* Список клиентов */}
          {clients.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {clients.map((client) => {
                return (
                  <div
                    key={client._id}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-medium shrink-0">
                      {getInitials(client.username)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {client.username}
                      </p>
                      {/* <p className="text-xs text-gray-500 truncate">ivan@mail.com</p> */}
                    </div>
                    {client.assignedPrograms.length !== 0 ? (
                      client.assignedPrograms.map((program) => {
                        return (
                          <div className="flex items-center gap-1.5">
                            <span
                              key={program._id}
                              className="hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600"
                            >
                              {program.title}
                            </span>
                            <div className="flex items-center shrink-0">
                              <p className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                📋
                              </p>
                              <p className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                👤
                              </p>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <span className="hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                        Without a program
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-sm">
                You don't have any clients yet
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedProgram && (
        <AssignProgramModal
          key={selectedProgram._id || "empty"}
          isOpen={!!selectedProgram}
          onClose={() => setSelectedProgram(null)}
          assignedClientIds={selectedProgram.assignedTo}
          programId={selectedProgram._id}
        />
      )}
    </div>
  )
}

export default TrainerDashboard
