import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../utils/axios"

interface User {
  _id: string
  username: string
  role: "client" | "trainer" | "admin"
}

interface AdminState {
  users: User[]
}

const initialState: AdminState = {
  users: [],
}

interface changeUserRoleProps {
  id: string
  role: "client" | "trainer" | "admin"
}

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/admin/get-users")

      return res.data
    } catch (error: any) {
      console.error(error)

      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "No access",
        status: error.response?.status,
      })
    }
  },
)

export const changeUserRole = createAsyncThunk(
  "admin/change-user-role",
  async ({ id, role }: changeUserRoleProps, thunkAPI) => {
    try {
      const res = await instance.patch("/admin/change-user-role", { id, role })

      return res.data
    } catch (error: any) {
      console.error(error)

      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "No access",
        status: error.response?.status,
      })
    }
  },
)

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get users
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = [...action.payload.users]
    })
    builder.addCase(getUsers.rejected, (state) => {
      state.users = []
    })

    // Change user role
    builder.addCase(changeUserRole.fulfilled, (state, action) => {
      state.users = [...state.users, action.payload.updatedUser]
    })
    builder.addCase(changeUserRole.rejected, (state) => {
      state.users = [...state.users]
    })
  },
})

export default adminSlice.reducer
