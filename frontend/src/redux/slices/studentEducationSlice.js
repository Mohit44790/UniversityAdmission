import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

// ==========================
// FETCH EDUCATION
// ==========================
export const fetchEducation = createAsyncThunk(
  "education/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/student/education");
      return res.data;
    } catch {
      return rejectWithValue("Failed to load education");
    }
  }
);

// ==========================
// SAVE EDUCATION
// ==========================
export const saveEducation = createAsyncThunk(
  "education/save",
  async ({ programLevel, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/student/education?programLevel=${programLevel}`,
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save education");
    }
  }
);

// ==========================
// DELETE EDUCATION
// ==========================
export const deleteEducation = createAsyncThunk(
  "education/delete",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/api/student/education");
      return true;
    } catch {
      return rejectWithValue("Failed to delete education");
    }
  }
);

const studentEducationSlice = createSlice({
  name: "education",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveEducation.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      .addCase(deleteEducation.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export default studentEducationSlice.reducer;
