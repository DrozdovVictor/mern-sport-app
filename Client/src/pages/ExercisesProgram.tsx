import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { Link, useLocation } from "react-router"
import {
  createExercisesProgram,
  editExercisesProgram,
} from "../redux/slices/exersisesProgramSlice"
import { toast } from "react-toastify"

// Описываем структуру одного упражнения в форме
interface SelectedExercise {
  id: string // Внутренний ID для key в React (можно использовать Date.now().toString())
  exerciseId: string // id упражнения из базы данных
  sets: number
  reps: number
  restTime: number
}

function ExercisesProgram() {
  const { exercises } = useSelector((state: RootState) => state.exercises)
  const dispatch = useDispatch<AppDispatch>()
  // 1. Безопасно достаем данные из location.state
  // Если пользователь зашел на страницу напрямую по ссылке (без клика), state будет null,
  // поэтому делаем заглушки по умолчанию через оператор `||`
  const {
    id: editProgramId = "",
    title: editProgramTitle = "",
    description: editProgramDesc = "",
    exercises: editProgramExercises = [],
  } = useLocation().state || {}

  const [title, setTitle] = useState(editProgramTitle ? editProgramTitle : "")
  const [description, setDescription] = useState(
    editProgramDesc ? editProgramDesc : "",
  )

  // Стейт для динамического списка выбранных упражнений
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >(() => {
    if (editProgramExercises.length === 0) {
      return [{ id: "init-1", exerciseId: "", sets: 3, reps: 10, restTime: 60 }]
    }

    return editProgramExercises.map((ex: any, index: number) => {
      // Защита: если бэкенд вернул exercise как объект (после populate), берем ._id.
      // Если вернул просто как строку-ID, берем ее целиком.
      const actualExerciseId =
        typeof ex.exercise === "object" && ex.exercise !== null
          ? ex.exercise._id
          : ex.exercise

      return {
        id: `edit-${index}-${Date.now()}`, // уникальный ключ для React
        exerciseId: actualExerciseId || "",
        sets: ex.sets || 0,
        reps: ex.reps || 0,
        restTime: ex.restTime || 0,
      }
    })
  })

  // Добавление нового пустого упражнения в список
  const handleAddExercise = () => {
    setSelectedExercises([
      ...selectedExercises,
      {
        id: Date.now().toString(), // Уникальный временный ID для React key
        exerciseId: "",
        sets: 3,
        reps: 10,
        restTime: 60,
      },
    ])
  }

  // Удаление упражнения из списка
  const handleRemoveExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter((item) => item.id !== id))
  }

  // Универсальная функция для изменения полей внутри конкретного упражнения
  const handleFieldChange = (
    id: string,
    field: keyof SelectedExercise,
    value: string | number,
  ) => {
    setSelectedExercises(
      selectedExercises.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  // Отправка готовой формы на бэкенд
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация перед отправкой
    const hasEmptyExercise = selectedExercises.some((ex) => !ex.exerciseId)
    if (hasEmptyExercise) {
      toast("Select the exercises in all fields.")
      return
    }

    // Формируем тело запроса под ваш бэкенд
    const programData = {
      title,
      description,
      // Преобразуем структуру под требования вашей схемы Mongoose
      exercises: selectedExercises.map((ex) => ({
        exercise: ex.exerciseId, // Сюда уходит именно 24-значный ObjectId
        sets: Number(ex.sets),
        reps: Number(ex.reps),
        restTime: Number(ex.restTime),
      })),
    }

    try {
      if (editProgramId) {
        await dispatch(
          editExercisesProgram({
            id: editProgramId,
            title: programData.title,
            description: programData.description,
            exercises: programData.exercises,
          }),
        ).unwrap()
      } else {
        await dispatch(createExercisesProgram(programData)).unwrap()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/programs" className="text-indigo-600 hover:underline">
            Программы
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">Создание</span>
        </nav>

        {/* Заголовок */}
        <h1 className="text-2xl font-bold text-gray-900">Создать программу</h1>
        <p className="text-gray-500 mt-1 mb-8">
          Соберите программу из своих упражнений
        </p>

        {/* Основная карточка формы */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ==================== Секция 1: Основная информация ==================== */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="programName"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Название программы <span className="text-red-500">*</span>
                </label>
                <input
                  id="programName"
                  type="text"
                  placeholder="Например: Силовой цикл"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Как программа будет называться в списке
                </p>
              </div>

              <div>
                <label
                  htmlFor="programDescription"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Описание <span className="text-gray-400">(опционально)</span>
                </label>
                <textarea
                  id="programDescription"
                  rows={3}
                  placeholder="Цель программы, рекомендации, уровень подготовки..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* ==================== Секция 2: Упражнения ==================== */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Упражнения
                </h2>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  onClick={handleAddExercise}
                >
                  + Добавить упражнение
                </button>
              </div>

              {/* Динамический список упражнений */}
              <div className="space-y-3">
                {/* Пример упражнения */}
                {selectedExercises.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex gap-4"
                    >
                      <div className="flex-1">
                        <div>
                          <label htmlFor="exercise-1" className="sr-only">
                            Упражнение 1
                          </label>
                          <select
                            value={item.exerciseId}
                            id="exercise-1"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                "exerciseId",
                                e.target.value,
                              )
                            }
                          >
                            <option value="" disabled>
                              Выберите упражнение
                            </option>
                            {exercises.map((exercise) => {
                              return (
                                <option key={exercise._id} value={exercise._id}>
                                  {exercise.title}
                                </option>
                              )
                            })}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                          <div>
                            <label
                              htmlFor="sets-1"
                              className="text-xs text-gray-500 mb-1 block"
                            >
                              Подходы
                            </label>
                            <input
                              id="sets-1"
                              type="number"
                              min="1"
                              value={item.sets}
                              onChange={(e) =>
                                handleFieldChange(
                                  item.id,
                                  "sets",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="reps-1"
                              className="text-xs text-gray-500 mb-1 block"
                            >
                              Повторения
                            </label>
                            <input
                              id="reps-1"
                              type="number"
                              min="1"
                              value={item.reps}
                              onChange={(e) =>
                                handleFieldChange(
                                  item.id,
                                  "reps",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="rest-1"
                              className="text-xs text-gray-500 mb-1 block"
                            >
                              Отдых (сек)
                            </label>
                            <input
                              id="rest-1"
                              type="number"
                              min="0"
                              step={5}
                              value={item.restTime}
                              onChange={(e) =>
                                handleFieldChange(
                                  item.id,
                                  "restTime",
                                  e.target.value,
                                )
                              }
                              className="we-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Управление порядком и удаление */}
                      <div className="flex flex-col gap-1">
                        {/* <button
                          type="button"
                          aria-label="Переместить вверх"
                          className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
                          // TODO: обработчик изменения порядка (вверх)
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          aria-label="Переместить вниз"
                          className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
                          // TODO: обработчик изменения порядка (вниз)
                        >
                          ↓
                        </button> */}
                        <button
                          type="button"
                          aria-label="Удалить упражнение"
                          className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors"
                          onClick={() => handleRemoveExercise(item.id)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Пустое состояние */}
              {/* <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <p className="text-gray-500">Пока нет упражнений</p>
                <p className="text-sm text-gray-400 mt-1">
                  Нажмите «Добавить упражнение», чтобы начать
                </p>
              </div> */}
            </div>

            {/* ==================== Секция 3: Ошибка (пример) ==================== */}
            {/* <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              Не удалось создать программу. Попробуйте ещё раз.
            </div> */}

            {/* <AssignProgramModal /> */}

            {/* ==================== Секция 4: Кнопки ==================== */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Link
                to="/trainer"
                className="px-4 py-2.5 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Отмена
              </Link>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Создать программу
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExercisesProgram
