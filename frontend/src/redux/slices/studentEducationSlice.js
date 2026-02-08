import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

// ==========================
// FETCH BASIC EDUCATION
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
// SAVE BASIC EDUCATION
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
// SAVE QUALIFICATION
// ==========================
export const saveQualification = createAsyncThunk(
  "education/saveQualification",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/student/education/qualification",
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save qualification");
    }
  }
);

// ==========================
// SAVE SUBJECT MARKS
// ==========================
export const saveMarks = createAsyncThunk(
  "education/saveMarks",
  async (marksList, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/student/education/marks",
        marksList
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save marks");
    }
  }
);

// ==========================
// FETCH QUALIFICATION
// ==========================
export const fetchQualification = createAsyncThunk(
  "education/fetchQualification",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/student/education/qualification");
      return res.data;
    } catch {
      return rejectWithValue("Failed to fetch qualification");
    }
  }
);

// ==========================
// FETCH MARKS
// ==========================
export const fetchMarks = createAsyncThunk(
  "education/fetchMarks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/student/education/marks");
      return res.data;
    } catch {
      return rejectWithValue("Failed to fetch marks");
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

// ==========================
// SLICE
// ==========================
const studentEducationSlice = createSlice({
  name: "education",
  initialState: {
    data: null,
    qualification: null,
    marks: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // BASIC EDUCATION
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

      // QUALIFICATION
      .addCase(saveQualification.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(fetchQualification.fulfilled, (state, action) => {
        state.qualification = action.payload;
      })

      // MARKS
      .addCase(saveMarks.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(fetchMarks.fulfilled, (state, action) => {
        state.marks = action.payload;
      })

      // DELETE
      .addCase(deleteEducation.fulfilled, (state) => {
        state.data = null;
        state.qualification = null;
        state.marks = [];
      });
  },
});

export default studentEducationSlice.reducer;
