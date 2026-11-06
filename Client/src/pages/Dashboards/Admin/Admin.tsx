import { useSelector } from "react-redux"
import type { RootState } from "../../../redux/store"

import Navbar from "../Navbar"
import UserRow from "./UserRow"

function AdminDashboard() {
  const { username } = useSelector((state: RootState) => state.auth)
  const { users } = useSelector((state: RootState) => state.admin)
  const { exercises } = useSelector((state: RootState) => state.exercises)
  const { exercisesPrograms } = useSelector(
    (state: RootState) => state.exercisesProgram,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Приветственный блок */}
        <h1 className="text-3xl font-bold text-gray-900">Hi, {username}!</h1>
        <p className="text-gray-500 mt-2">General club statistics</p>
        {/* Статистические карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">👥</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {users.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total users</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">📋</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {exercisesPrograms.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Exercises programs</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">💪</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {exercises.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Exercises</p>
          </div>
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-2xl">🟢</div>
            <p className="text-3xl font-bold text-gray-900 mt-4">23</p>
            <p className="text-sm text-gray-500 mt-1">Активных сегодня</p>
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
                    Новый пользователь: maria@mail.com
                  </p>
                  <p className="text-xs text-gray-500 mt-1">30 минут назад</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  📋
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Создана программа тренером Алексеем
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 часа назад</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-100 last:border-0 pb-4 mb-4 last:mb-0">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  💪
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Добавлено упражнение: Приседания
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
                href="/admin/users"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>👥</span>
                <span className="text-sm font-medium text-gray-700">
                  Управление пользователями
                </span>
              </a>
              <a
                href="/admin/exercises"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>📚</span>
                <span className="text-sm font-medium text-gray-700">
                  Управление упражнениями
                </span>
              </a>
              <a
                href="/admin/stats"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>📊</span>
                <span className="text-sm font-medium text-gray-700">
                  Статистика клуба
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
          {/* Шапка списка (скрыта на мобилках) */}
          <div className="hidden md:flex items-center bg-gray-50 border-b border-gray-100 px-6 py-4 gap-6">
            <div className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </div>
            <div className="w-40 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </div>
            <div className="w-24 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Save
            </div>
          </div>
          {/* Список пользователей */}
          <div className="divide-y divide-gray-100">
            {users.map((user) => {
              return (
                <UserRow
                  key={user._id}
                  id={user._id}
                  username={user.username}
                  role={user.role}
                />
              )
            })}
          </div>
        </div>
        {/* Empty State */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-4xl text-gray-300">👥</div>
          <p className="text-gray-500 mt-4">Пользователи не найдены</p>
        </div> */}
      </div>
    </div>
  )
}

export default AdminDashboard
