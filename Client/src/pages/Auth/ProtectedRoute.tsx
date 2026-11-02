import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import { checkIsAuth } from "../../redux/slices/authSlice"
import type { RootState } from "../../redux/store"

export const ProtectedRoute = () => {
  const isAuth = useSelector(checkIsAuth)
  const { isLoading } = useSelector((state: RootState) => state.app)

  if (isLoading) return <div>Загрузка...</div> // Ждем, пока getMe проверит токен

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
