import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../utils/axios"

interface Trainer {
  _id: string
  username: string
}

interface ClientState {
  trainers: Trainer[]
  myTrainer: Trainer | null
}

const initialState: ClientState = {
  trainers: [],
  myTrainer: null,
}

interface chooseTrainerProps {
  trainerId: string
}

export const getTrainers = createAsyncThunk(
  "client/getTrainers",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/client/get-trainers")

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

export const getMyTrainer = createAsyncThunk(
  "client/getMyTrainer",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/client/get-my-trainer")

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

export const chooseTrainer = createAsyncThunk(
  "client/chooseTrainer",
  async ({ trainerId }: chooseTrainerProps, thunkAPI) => {
    try {
      const res = await instance.patch("/client/choose-trainer", { trainerId })

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

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get trainers
    builder.addCase(getTrainers.fulfilled, (state, action) => {
      state.trainers = [...action.payload.trainers]
    })
    builder.addCase(getTrainers.rejected, (state) => {
      state.trainers = []
    })

    // Get my trainer
    builder.addCase(getMyTrainer.fulfilled, (state, action) => {
      state.myTrainer = action.payload.trainer
    })
    builder.addCase(getMyTrainer.rejected, (state) => {
      state.myTrainer = null
    })

    // Choose trainer
    builder.addCase(chooseTrainer.fulfilled, (state, action) => {
      state.myTrainer = action.payload.trainer || null
    })
    builder.addCase(chooseTrainer.rejected, (state) => {
      state.myTrainer = null
    })
  },
})

export default clientSlice.reducer
