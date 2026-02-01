import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

export const fetchColleges = createAsyncThunk(
  "college/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/admin/colleges");
      return res.data;
    } catch {
      return rejectWithValue("Failed to load colleges");
    }
  }
);

export const createCollege = createAsyncThunk(
  "college/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/admin/colleges", data);
      return res.data;
    } catch {
      return rejectWithValue("Failed to create college");
    }
  }
);

const collegeSlice = createSlice({
  name: "college",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default collegeSlice.reducer;
