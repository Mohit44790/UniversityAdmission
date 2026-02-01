import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

export const fetchProgramCollegesByLevel = createAsyncThunk(
  "programCollege/fetchByLevel",
  async (level, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/admin/program-colleges?level=${level}`);
      return res.data;
    } catch {
      return rejectWithValue("Failed to load program colleges");
    }
  }
);

export const createProgramCollege = createAsyncThunk(
  "programCollege/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/admin/program-colleges", data);
      return res.data;
    } catch {
      return rejectWithValue("Failed to create mapping");
    }
  }
);

const programCollegeSlice = createSlice({
  name: "programCollege",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProgramCollegesByLevel.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default programCollegeSlice.reducer;
