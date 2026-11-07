import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import { checkIsAuth } from "../../redux/slices/authSlice"
import type { RootState } from "../../redux/store"

export const ProtectedRoute = () => {
  const isAuth = useSelector(checkIsAuth)
  const { isLoading } = useSelector((state: RootState) => state.app)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Анимированная гантеля */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-40" />
          <div className="relative w-16 h-16 bg-white rounded-full shadow-lg border border-indigo-100 flex items-center justify-center animate-bounce">
            <span className="text-2xl">🏋️</span>
          </div>
        </div>
        {/* Спиннер-индикатор */}
        <div className="mt-6 w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="mt-4 text-sm font-medium text-gray-700">
          We’re warming up before going in...
        </p>
        <p className="mt-1 text-xs text-gray-400">
          We are checking your subscription
        </p>
      </div>
    )
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
