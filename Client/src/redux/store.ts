// import { configureStore } from "@reduxjs/toolkit"
// import appReducer from "./slices/appSlice"
// import authReducer from "./slices/authSlice"
// import exercisesReducer from "./slices/exercisesSlice"
// import exercisesProgramReducer from "./slices/exersisesProgramSlice"
// import clientReducer from "./slices/clientSlice"
// import trainerSlice from "./slices/trainerSlice"
// import adminSlice from "./slices/adminSlice"

// export const store = configureStore({
//   reducer: {
//     app: appReducer,
//     auth: authReducer,
//     exercises: exercisesReducer,
//     exercisesProgram: exercisesProgramReducer,
//     client: clientReducer,
//     trainer: trainerSlice,
//     admin: adminSlice,
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit"
import appReducer from "./slices/appSlice"
import authReducer from "./slices/authSlice"
import exercisesReducer from "./slices/exercisesSlice"
import exercisesProgramReducer from "./slices/exersisesProgramSlice"
import clientReducer from "./slices/clientSlice"
import trainerSlice from "./slices/trainerSlice"
import adminSlice from "./slices/adminSlice"

// 1. Создаем глобальный экшен для полного сброса стора
export const logoutReset = createAction("GLOBAL_RESET")

// 2. Объединяем все существующие редюсеры в один комбинированный
const combinedReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  exercises: exercisesReducer,
  exercisesProgram: exercisesProgramReducer,
  client: clientReducer,
  trainer: trainerSlice,
  admin: adminSlice,
})

// 3. Создаем корневой редюсер с логикой сброса
const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: any,
) => {
  if (action.type === logoutReset.type) {
    // Передаем undefined — это заставит Redux Toolkit инициализировать ВСЕ слайсы их дефолтными initialState
    state = undefined
  }
  return combinedReducer(state, action)
}

// 4. Передаем rootReducer в конфигурацию стора
export const store = configureStore({
  reducer: rootReducer,
})

// Выводим типы RootState и AppDispatch из стора
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
