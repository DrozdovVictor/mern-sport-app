import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../redux/store"
import { changeUserRole } from "../../../redux/slices/adminSlice"
import { getInitials } from "../../../utils/getInitials"

interface UserRowProps {
  id: string
  username: string
  role: "client" | "trainer" | "admin"
}

function UserRow({ id, username, role }: UserRowProps) {
  const dispatch = useDispatch<AppDispatch>()

  // 1. Локальный стейт для выбранной роли (инициализируем текущей ролью)
  const [selectedRole, setSelectedRole] = useState(role)

  // 2. Проверяем, изменилась ли роль (чтобы активировать кнопку)
  const isChanged = selectedRole !== role

  // 3. Обработчик сохранения
  const handleSave = () => {
    if (!isChanged) return
    dispatch(changeUserRole({ id, role: selectedRole }))
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium shrink-0">
          {getInitials(username)}
        </div>
        <span className="text-sm font-medium text-gray-900 truncate">
          {username}
        </span>
      </div>

      <div className="md:w-40">
        <select
          aria-label="Edit role"
          // ✅ Заменили defaultValue на value
          value={selectedRole}
          // ✅ Добавили обработчик
          onChange={(e) =>
            setSelectedRole(e.target.value as UserRowProps["role"])
          }
          className="w-full max-w-35 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="client">Client</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="md:w-24">
        <button
          type="button"
          onClick={handleSave}
          // ✅ Блокируем кнопку, если роль не изменилась
          disabled={!isChanged}
          aria-label="Save role"
          className="w-8 h-8 rounded-lg hover:bg-indigo-50 text-indigo-600 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <path d="M17 21v-8H7v8M7 3v5h8" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default UserRow
