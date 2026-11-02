import { configureStore } from "@reduxjs/toolkit"
import appReducer from "./slices/appSlice"
import authReducer from "./slices/authSlice"
import exercisesReducer from "./slices/exercisesSlice"
import exercisesProgramReducer from "./slices/exersisesProgramSlice"
import clientReducer from "./slices/clientSlice"
import trainerSlice from "./slices/trainerSlice"
import adminSlice from "./slices/adminSlice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    exercises: exercisesReducer,
    exercisesProgram: exercisesProgramReducer,
    client: clientReducer,
    trainer: trainerSlice,
    admin: adminSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
