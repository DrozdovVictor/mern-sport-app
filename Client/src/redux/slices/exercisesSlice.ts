import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../utils/axios"

export interface Exercise {
  _id: string
  title: string
  description?: string
  authorId: string
  __v: number
}

interface initialStateProps {
  exercises: Exercise[]
}

const initialState: initialStateProps = {
  exercises: [],
}

interface exerciseProps {
  id?: string
  title: string
  description?: string
}

export const getExercises = createAsyncThunk(
  "exercises/getExercises",
  async () => {
    try {
      const res = await instance.get("/exercises/get")

      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const getExercisesForAdmin = createAsyncThunk(
  "exercises/getExercisesForAdmin",
  async () => {
    try {
      const res = await instance.get("/exercises/get-all")

      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const createExercise = createAsyncThunk(
  "exercises/createExercise",
  async ({ title, description }: exerciseProps, thunkAPI) => {
    try {
      const res = await instance.post("/exercises/create", {
        title,
        description,
      })

      return res.data
    } catch (error: any) {
      console.log(error)
      // Берем ошибку из ответа сервера, либо падаем на дефолтный error.message
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong"

      return thunkAPI.rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
      })
    }
  },
)

export const editExercise = createAsyncThunk(
  "exercises/editExercise",
  async ({ id, title, description }: exerciseProps, thunkAPI) => {
    try {
      const res = await instance.post("/exercises/edit", {
        id,
        title,
        description,
      })

      return res.data
    } catch (error: any) {
      console.log(error)

      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong"

      return thunkAPI.rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
      })
    }
  },
)

export const deleteExercise = createAsyncThunk(
  "exercises/deleteExercise",
  async (id: string, thunkAPI) => {
    try {
      const res = await instance.post("/exercises/delete", { id })

      return res.data
    } catch (error: any) {
      console.log(error)

      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong"

      return thunkAPI.rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
      })
    }
  },
)

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get
    builder.addCase(getExercises.fulfilled, (state, action) => {
      if (action.payload.data) state.exercises = [...action.payload.data]
    })
    builder.addCase(getExercises.rejected, (state) => {
      state.exercises = []
    })

    builder.addCase(getExercisesForAdmin.fulfilled, (state, action) => {
      state.exercises = [...action.payload.data]
    })
    builder.addCase(getExercisesForAdmin.rejected, (state) => {
      state.exercises = []
    })

    // Create
    builder.addCase(createExercise.fulfilled, (state, action) => {
      state.exercises = [...state.exercises, action.payload.data]
    })

    // Edit
    builder.addCase(editExercise.fulfilled, (state, action) => {
      const index = state.exercises.findIndex(
        (exercise) => exercise._id === action.payload.data._id,
      )

      if (index !== -1) {
        state.exercises[index] = action.payload.data
      }
    })

    // Delete
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      const notDeletedExercises = state.exercises.filter(
        (exercise) => exercise._id !== action.payload.data._id,
      )
      state.exercises = [...notDeletedExercises]
    })
  },
})

export default exercisesSlice.reducer
