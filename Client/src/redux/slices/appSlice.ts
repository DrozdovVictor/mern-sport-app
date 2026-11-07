import { createSlice, type AsyncThunk } from "@reduxjs/toolkit"

import { loginUser, registerUser, logoutUser, getMe } from "./authSlice"
import {
  getExercises,
  getExercisesForAdmin,
  createExercise,
  editExercise,
  deleteExercise,
} from "./exercisesSlice"
import {
  getExercisesProgramsForClient,
  getExercisesProgramsForTrainer,
  getExercisesPrograms,
  createExercisesProgram,
  editExercisesProgram,
  deleteExercisesProgram,
  assignExercisesProgram,
} from "./exersisesProgramSlice"
import { chooseTrainer, getMyTrainer, getTrainers } from "./clientSlice"
import { getClients } from "./trainerSlice"
import { changeUserRole, getUsers } from "./adminSlice"

interface AppState {
  notification: string | null
  isLoading: boolean
}

const initialState: AppState = {
  notification: null,
  isLoading: false,
}

// Thunks, которые должны показывать глобальный полноэкранный лоадер
const globalLoadingThunks: AsyncThunk<any, any, any>[] = [
  // auth
  loginUser,
  registerUser,
  logoutUser,
  getMe,

  // exercises
  getExercises,
  getExercisesForAdmin,

  // exercsies programs
  getExercisesPrograms,
  getExercisesProgramsForClient,
  getExercisesProgramsForTrainer,

  // client
  getTrainers,
  getMyTrainer,

  // trainner
  getClients,

  // admin
  getUsers,
]

// Thunks, которые обрабатывают только уведомления (без глобального лоадера)
const notificationOnlyThunks: AsyncThunk<any, any, any>[] = [
  // exercises
  createExercise,
  editExercise,
  deleteExercise,

  // exercsies programs
  createExercisesProgram,
  editExercisesProgram,
  deleteExercisesProgram,
  assignExercisesProgram,

  // client
  chooseTrainer,

  // admin
  changeUserRole,
]

// Объединяем их для обработки fulfilled/rejected уведомлений
const allThunks = [...globalLoadingThunks, ...notificationOnlyThunks]

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
    // Обрабатываем PENDING для всех thunks
    allThunks.forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        // Включаем глобальный isLoading ТОЛЬКО если thunk находится в списке глобальных
        if (globalLoadingThunks.includes(thunk)) {
          state.isLoading = true
        }
      })
    })

    // Обрабатываем FULFILLED для всех thunks (ровно один addCase на каждый thunk!)
    allThunks.forEach((thunk) => {
      builder.addCase(thunk.fulfilled, (state, action: any) => {
        // Выключаем глобальный лоадер, если он включался
        if (globalLoadingThunks.includes(thunk)) {
          state.isLoading = false
        }

        // Логика уведомлений
        const isGetAction =
          action.type.startsWith("auth/getMe") ||
          action.type.includes("/getExercises") ||
          action.type.includes("/getAllExercisesProgram")
        if (isGetAction) return

        if (action.payload?.message) {
          state.notification = action.payload.message
        }
      })
    })

    // Обрабатываем REJECTED для всех thunks (ровно один addCase на каждый thunk!)
    allThunks.forEach((thunk) => {
      builder.addCase(thunk.rejected, (state, action: any) => {
        // Выключаем глобальный лоадер, если он включался
        if (globalLoadingThunks.includes(thunk)) {
          state.isLoading = false
        }

        // Логика уведомлений при ошибках
        // const isGetMe = action.type.startsWith("auth/getMe")
        // const isGetExercises = action.type.includes("/getExercises")
        const statusCode = action.payload?.status || action.error?.status

        if (
          // isGetMe ||
          // isGetExercises ||
          statusCode === 401 ||
          statusCode === 403
        ) {
          return
        }

        const errorMessage =
          action.payload?.message || action.error?.message || "Произошла ошибка"
        state.notification = errorMessage
      })
    })
  },
})

export const { clearNotification } = appSlice.actions
export default appSlice.reducer
