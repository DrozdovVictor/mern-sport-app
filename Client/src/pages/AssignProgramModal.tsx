import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useState } from "react"
import { assignExercisesProgram } from "../redux/slices/exersisesProgramSlice"

interface AssignProgramModalProps {
  isOpen: boolean
  onClose: () => void
  programName?: string
  assignedClientIds: string[]
  programId: string
}

function AssignProgramModal({
  isOpen,
  onClose,
  programName,
  assignedClientIds,
  programId,
}: AssignProgramModalProps) {
  const clients = useSelector((state: RootState) => state.trainer.clients)

  const [selectedIds, setSelectedIds] = useState<string[]>(
    assignedClientIds || [],
  )
  const dispatch = useDispatch<AppDispatch>()

  // Функция для переключения чекбокса
  const toggleClient = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id],
    )
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Модальная карточка */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8">
        {/* Заголовок */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Назначить программу
            </h2>
            <p className="text-sm text-gray-500 mt-1">{programName}</p>
          </div>
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="w-8 h-8 shrink-0 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Список клиентов */}
        <div className="mt-5 max-h-80 overflow-y-auto -mx-2 px-2">
          {clients.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              У вас пока нет клиентов
              <p className="text-xs text-gray-400 mt-1">
                Обратитесь к администратору
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {clients.map((client) => (
                <label
                  key={client._id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(client._id)}
                    onChange={() => toggleClient(client._id)}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {client.username}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Футер */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Выбрано: {selectedIds.length}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            {/* TODO: обработчик назначения (POST assignedTo) */}
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()

                dispatch(
                  assignExercisesProgram({
                    programId: programId,
                    clientIds: selectedIds,
                  }),
                )

                onClose()
              }}
              className="px-4 py-2.5 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Назначить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignProgramModal
