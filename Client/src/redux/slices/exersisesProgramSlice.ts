import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../utils/axios"

interface ExercisesProgram {
  _id: string
  title: string
  description?: string
  exercises: Exercise[]
  authorId: string
  assignedTo: string[]
}

interface initialStateProps {
  exercisesPrograms: ExercisesProgram[]
}

const initialState: initialStateProps = {
  exercisesPrograms: [],
}

interface Exercise {
  exercise: string
  sets: number
  reps: number
  restTime: number
  order?: number
}

interface exercisesProgramProps {
  id?: string
  title: string
  description?: string
  exercises: Exercise[]
}

interface AssignedClientData {
  programId: string
  clientIds: string[]
}

export const getExercisesProgramsForTrainer = createAsyncThunk(
  "exercisesProgram/getExercisesProgramForTrainer",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/exercisesProgram/trainer-get")

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

export const getExercisesProgramsForClient = createAsyncThunk(
  "exercisesProgram/getExercisesProgramForClient",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/exercisesProgram/user-get")

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

export const getExercisesPrograms = createAsyncThunk(
  "exercisesProgram/getAllExercisesProgram",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/exercisesProgram/get-all")

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

export const createExercisesProgram = createAsyncThunk(
  "exercisesProgram/createExercisesProgram",
  async (
    { title, description, exercises }: exercisesProgramProps,
    thunkAPI,
  ) => {
    try {
      const res = await instance.post("/exercisesProgram/create", {
        title,
        description,
        exercises,
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

export const editExercisesProgram = createAsyncThunk(
  "exercisesProgram/editExercisesProgram",
  async (
    { id, title, exercises, description }: exercisesProgramProps,
    thunkAPI,
  ) => {
    try {
      const res = await instance.post("/exercisesProgram/edit", {
        id,
        title,
        description,
        exercises,
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

export const deleteExercisesProgram = createAsyncThunk(
  "exercisesProgram/deleteExercisesProgram",
  async (id: string, thunkAPI) => {
    try {
      const res = await instance.post("/exercisesProgram/delete", { id })

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

export const assignExercisesProgram = createAsyncThunk(
  "exercisesProgram/assignExercisesProgram",
  async ({ programId, clientIds }: AssignedClientData, thunkAPI) => {
    try {
      const res = await instance.patch(
        `/exercisesProgram/${programId}/assign`,
        {
          clientIds,
        },
      )
      return res.data // Это обновленная программа
    } catch (error: any) {
      console.error(error)

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Ошибка назначения программы",
      )
    }
  },
)

export const exercisesProgramSlice = createSlice({
  name: "exercisesProgram",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get exercises programs
    builder.addCase(
      getExercisesProgramsForTrainer.fulfilled,
      (state, action) => {
        if (action.payload.data)
          state.exercisesPrograms = [...action.payload.data]
      },
    )
    builder.addCase(getExercisesProgramsForTrainer.rejected, (state) => {
      state.exercisesPrograms = []
    })

    builder.addCase(
      getExercisesProgramsForClient.fulfilled,
      (state, action) => {
        state.exercisesPrograms = [...action.payload.exercisesPrograms]
      },
    )
    builder.addCase(getExercisesProgramsForClient.rejected, (state) => {
      state.exercisesPrograms = []
    })

    builder.addCase(getExercisesPrograms.fulfilled, (state, action) => {
      state.exercisesPrograms = [...action.payload.exercisesPrograms]
    })
    builder.addCase(getExercisesPrograms.rejected, (state) => {
      state.exercisesPrograms = []
    })

    // Create
    builder.addCase(createExercisesProgram.fulfilled, (state, action) => {
      state.exercisesPrograms = [
        ...state.exercisesPrograms,
        action.payload.data,
      ]
    })

    // Edit
    builder.addCase(editExercisesProgram.fulfilled, (state, action) => {
      const index = state.exercisesPrograms.findIndex(
        (exercisesProgram) => exercisesProgram._id === action.payload.data._id,
      )

      if (index !== -1) {
        state.exercisesPrograms[index] = action.payload.data
      }
    })

    // Delete
    builder.addCase(deleteExercisesProgram.fulfilled, (state, action) => {
      const notDeletedExercises = state.exercisesPrograms.filter(
        (exercisesProgram) => exercisesProgram._id !== action.payload.data._id,
      )
      state.exercisesPrograms = [...notDeletedExercises]
    })

    // Assign
    builder.addCase(assignExercisesProgram.fulfilled, (state, action) => {
      // 1. Обновляем программу в общем списке (чтобы на карточке изменился счетчик)
      const index = state.exercisesPrograms.findIndex(
        (program) => program._id === action.payload.updatedProgram._id,
      )

      // Если программа нашлась в списке — заменяем её на обновленную
      if (index !== -1) {
        state.exercisesPrograms[index] = action.payload.updatedProgram
      }
    })
  },
})

export default exercisesProgramSlice.reducer
