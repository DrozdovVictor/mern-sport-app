import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import instance from "../../utils/axios"
import type { RootState } from "../store"

// interface UserProps {
//   token: string
//   username: string
//   message: string
// }

interface initialStateProps {
  username?: string | null
  role: "client" | "trainer" | "admin" | ""
}

interface registerUserProps {
  username: string
  password: string
}

const initialState: initialStateProps = {
  username: null,
  role: "",
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }: registerUserProps, thunkAPI) => {
    try {
      const res = await instance.post("/auth/register", {
        username,
        password,
      })

      return res.data
    } catch (error: any) {
      console.error(error)
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "No access",
        status: error.response?.status, // <--- Сохраняем 401 статус
      })
    }
  },
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: registerUserProps, thunkAPI) => {
    try {
      const res = await instance.post("/auth/login", {
        username,
        password,
      })

      return res.data
    } catch (error: any) {
      console.error(error)
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "No access",
        status: error.response?.status, // <--- Сохраняем 401 статус
      })
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const { data } = await instance.post("/auth/logout")
  return data
})

export const getMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const res = await instance.get("/auth/me")
    return res.data
  } catch (err) {
    console.error(err)
    const error = err as any
    // Прокидываем в payload и сообщение, и HTTP-статус ошибки
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || "No access",
      status: error.response?.status, // <--- Сохраняем 401 статус
    })
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.username = action.payload.username
      state.role = action.payload.role
    })

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.username = null
      state.role = ""
    })

    // Get me (проверка авторизации)
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.username = action.payload.username
      state.role = action.payload.role
    })
  },
})

export const checkIsAuth = (state: RootState) => Boolean(state.auth.username)

export default authSlice.reducer
