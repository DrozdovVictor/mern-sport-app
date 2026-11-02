import { createSlice } from "@reduxjs/toolkit"

import { loginUser, registerUser, logoutUser, getMe } from "./authSlice"
import {
  getExercises,
  createExercise,
  editExercise,
  deleteExercise,
} from "./exercisesSlice"
import {
  getExercisesProgramsForClient,
  getExercisesProgramsForTrainer,
  createExercisesProgram,
  editExercisesProgram,
  deleteExercisesProgram,
} from "./exersisesProgramSlice"
import { getClients } from "./trainerSlice"

interface AppState {
  notification: string | null
  isLoading: boolean
}

const initialState: AppState = {
  notification: null,
  isLoading: false,
}

const thunks = [
  loginUser,
  registerUser,
  logoutUser,
  getMe,

  getExercises,
  createExercise,
  editExercise,
  deleteExercise,

  getExercisesProgramsForClient,
  getExercisesProgramsForTrainer,
  createExercisesProgram,
  editExercisesProgram,
  deleteExercisesProgram,

  getClients,
]

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notification = null
    },
  },
  // 💡 Магия: перехватываем экшены из ДРУГИХ слайсов!
  extraReducers: (builder) => {
    thunks.forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.isLoading = true
      })
    })

    thunks.forEach((thunk) => {
      builder.addCase(thunk.fulfilled, (state, action: any) => {
        state.isLoading = false

        // Исключаем getMe и get-запросы, чтобы не спамить уведомлениями при обычной загрузке данных
        const isGetAction =
          action.type.startsWith("auth/getMe") ||
          action.type.includes("/getExercises")

        if (isGetAction) return

        // Если бэкенд передает текст успешного выполнения, записываем его в notification
        if (action.payload?.message) {
          state.notification = action.payload.message
        }
      })
    })

    thunks.forEach((thunk) => {
      builder.addCase(thunk.rejected, (state, action: any) => {
        // Логика сброса глобальной загрузки
        state.isLoading = false

        // 1. Проверяем, это ошибка 401 от getMe при старте приложения?
        const isGetMe = action.type.startsWith("auth/getMe")
        const isGetExercises = action.type.includes("/getExercises") // Сработает и на getExercises, и на getExercisesProgram
        const statusCode = action.payload?.status || action.error?.status

        // Если это запросы за данными при старте, и сервер ответил 401 или 403 — молча выходим
        if (
          (isGetMe || isGetExercises) &&
          (statusCode === 401 || statusCode === 403)
        ) {
          return
        }

        // 2. Для реальных ошибок показываем уведомление
        const errorMessage =
          action.payload?.message || action.error?.message || "Произошла ошибка"
        state.notification = errorMessage
      })
    })
  },
})

export const { clearNotification } = appSlice.actions
export default appSlice.reducer
