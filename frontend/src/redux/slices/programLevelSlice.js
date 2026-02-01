import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

// Fetch all levels
export const fetchProgramLevels = createAsyncThunk(
  "programLevel/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/admin/program-level");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load program levels");
    }
  }
);

// Create level
export const createProgramLevel = createAsyncThunk(
  "programLevel/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/admin/program-level", data);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to create program level");
    }
  }
);

const programLevelSlice = createSlice({
  name: "programLevel",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramLevels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgramLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProgramLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default programLevelSlice.reducer;
