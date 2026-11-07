import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import { getMe } from "./redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/store"
import { Route, Routes } from "react-router"

// Pages
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ClientDashboard from "./pages/Dashboards/Client"
import TrainerDashboard from "./pages/Dashboards/Trainer"
import AdminDashboard from "./pages/Dashboards/Admin/Admin"
import CreateOrEditExercise from "./pages/CreateOrEditExercise"
import {
  getExercises,
  getExercisesForAdmin,
} from "./redux/slices/exercisesSlice"
import ExercisesProgram from "./pages/ExercisesProgram"
import {
  getExercisesPrograms,
  getExercisesProgramsForClient,
  getExercisesProgramsForTrainer,
} from "./redux/slices/exersisesProgramSlice"
import { ProtectedRoute } from "./pages/Auth/ProtectedRoute"
import { clearNotification } from "./redux/slices/appSlice"
import { getClients } from "./redux/slices/trainerSlice"
import { getMyTrainer, getTrainers } from "./redux/slices/clientSlice"
import { getUsers } from "./redux/slices/adminSlice"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { role } = useSelector((state: RootState) => state.auth)
  const { notification } = useSelector((state: RootState) => state.app)

  useEffect(() => {
    const initApp = async () => {
      try {
        // 1. Получаем ответ целиком
        const response = await dispatch(getMe()).unwrap()

        // // 2. Достаем самого юзера
        // const currentUser = response.user

        // 3. Теперь роль определится верно
        if (response.role === "trainer") {
          dispatch(getExercises())
          dispatch(getExercisesProgramsForTrainer())
          dispatch(getClients())
        } else if (response.role === "client") {
          dispatch(getExercisesProgramsForClient())
          dispatch(getTrainers())
          dispatch(getMyTrainer())
        } else if (response.role === "admin") {
          dispatch(getExercisesForAdmin())
          dispatch(getExercisesPrograms())
          dispatch(getUsers())
        }
      } catch (err: any) {
        // Обработка ошибок (401 и т.д.)
        if (err?.status === 401 || err?.response?.status === 401) {
          console.log("Пользователь не авторизован")
          return
        }
        toast.error(err?.message || "Ошибка загрузки данных")
      }
    }

    initApp()
  }, [dispatch, role])

  useEffect(() => {
    if (notification) toast(notification)

    dispatch(clearNotification())
  }, [notification, dispatch])

  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/create-or-edit-exercise"
            element={<CreateOrEditExercise />}
          />
          <Route path="/exercises-program" element={<ExercisesProgram />} />
        </Route>
      </Routes>

      <ToastContainer position="top-center" />
    </>
  )
}

export default App
