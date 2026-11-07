import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../redux/store"
import { registerUser } from "../../redux/slices/authSlice"
import { Link } from "react-router"

import AuthLayout from "./AuthLayout"
import Input from "../../components/Input"
import { toast } from "react-toastify"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  async function handleRegister() {
    try {
      await dispatch(registerUser({ username, password })).unwrap()
      setUsername("")
      setPassword("")
    } catch (error) {
      console.error(error)
      toast.error("Error while registration")
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Registration
      </h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleRegister()
        }}
      >
        <Input
          id="name"
          type="text"
          label="Name"
          value={username}
          autoComplete="new-username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Register
