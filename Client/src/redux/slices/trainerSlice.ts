import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../utils/axios"

interface AssignedProgram {
  _id: string
  title: string
}

interface Client {
  _id: string
  username: string
  assignedPrograms: AssignedProgram[]
}

interface TrainerState {
  clients: Client[]
}

const initialState: TrainerState = {
  clients: [],
}

export const getClients = createAsyncThunk(
  "trainer/getClients",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/trainer/get-clients")

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

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get clients
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = [...action.payload.clients]
    })

    builder.addCase(getClients.rejected, (state) => {
      state.clients = []
    })
  },
})

export default trainerSlice.reducer
