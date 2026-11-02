import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../redux/store"
import { logoutUser } from "../../redux/slices/authSlice"

import { Link, useNavigate } from "react-router"

function Navbar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  async function handleLogout() {
    await dispatch(logoutUser()).unwrap()
    navigate("/login")
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
            Sport Club
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Дашборд
            </Link>
            <Link
              to="/profile"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Профиль
            </Link> */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
