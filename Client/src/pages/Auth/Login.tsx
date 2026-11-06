import { useEffect, useState } from "react"
import { checkIsAuth, loginUser } from "../../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { Link, useNavigate } from "react-router"

import AuthLayout from "./AuthLayout"
import Input from "../../components/Input"
import { toast } from "react-toastify"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const isAuth = useSelector(checkIsAuth)
  const { role } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuth) {
      if (role === "trainer") {
        navigate("/trainer")
      } else if (role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    }
  }, [isAuth, role, navigate])

  async function handleLogin() {
    try {
      await dispatch(loginUser({ username, password })).unwrap()
      setUsername("")
      setPassword("")
    } catch (error) {
      console.error(error)
      toast.error("Error while login")
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Login
      </h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <Input
          id="username"
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors"
        >
          Enter
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        No account?{" "}
        <Link
          to="/register"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Registration
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login
