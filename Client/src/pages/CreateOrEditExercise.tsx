import { useState } from "react"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { createExercise, editExercise } from "../redux/slices/exercisesSlice"

import { Link, useLocation } from "react-router"

function CreateOrEditExercise() {
  const location = useLocation()
  const exercise = location.state?.exercise
  const [title, setTitle] = useState(exercise?.title || "")
  const [description, setDescription] = useState(exercise?.description || "")
  const dispatch = useDispatch<AppDispatch>()

  function handleCreateOrEditExercise() {
    try {
      if (!exercise) {
        dispatch(createExercise({ title, description }))
      } else {
        dispatch(editExercise({ id: exercise?._id, title, description }))
      }
      setTitle("")
      setDescription("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <nav className="text-sm text-gray-500">
          <a
            href="/exercises"
            className="hover:text-indigo-600 transition-colors"
          >
            Упражнения
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Создание</span>
        </nav> */}

        {/* Заголовки */}
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {exercise ? "Edit the exercise" : "Create an exercise"}
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Fill in the information about the exercise
        </p>

        {/* Карточка формы */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              handleCreateOrEditExercise()
            }}
          >
            {/* Название */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Name of the exercise <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="For example: Bench press"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <p className="text-xs text-gray-400 mt-1">Required field</p>
            </div>

            {/* Описание */}
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Description <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe the technique, recommendations, etc."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Группа мышц */}
            {/* <div>
              <label
                htmlFor="muscleGroup"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Группа мышц <span className="text-gray-400">(опционально)</span>
              </label>
              <select
                id="muscleGroup"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="">Выберите группу мышц</option>
                <option value="chest">Грудь</option>
                <option value="back">Спина</option>
                <option value="legs">Ноги</option>
                <option value="shoulders">Плечи</option>
                <option value="arms">Руки</option>
                <option value="abs">Пресс</option>
              </select>
            </div> */}

            {/* Кнопки */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Link
                to="/trainer"
                className="px-4 py-2.5 rounded-lg font-medium transition-colors bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg font-medium transition-colors bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {exercise ? "Edit" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrEditExercise
