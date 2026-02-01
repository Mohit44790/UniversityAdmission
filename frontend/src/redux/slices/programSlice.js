import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

// Get programs by level code
export const fetchProgramsByLevel = createAsyncThunk(
  "program/fetchByLevel",
  async (levelCode, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/admin/programs?level=${levelCode}`);
      return res.data;
    } catch {
      return rejectWithValue("Failed to load programs");
    }
  }
);

// Create program
export const createProgram = createAsyncThunk(
  "program/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/admin/programs", data);
      return res.data;
    } catch {
      return rejectWithValue("Failed to create program");
    }
  }
);

const programSlice = createSlice({
  name: "program",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramsByLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgramsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProgramsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default programSlice.reducer;
