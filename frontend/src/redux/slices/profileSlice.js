import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";
import {
  setSessionData,
  getSessionData,
  removeSessionData
} from "../../utils/helpers";

/* ============================
   ASYNC THUNKS (API CALLS)
   ============================ */

// 1️⃣ Save Basic Details
export const profileBasicDetails = createAsyncThunk(
  "profile/saveBasic",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/student/profile/basic", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2️⃣ Save Family Details
export const saveFamilyDetails = createAsyncThunk(
  "profile/saveFamily",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/student/profile/family", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3️⃣ Save Bank Details
export const saveBankDetails = createAsyncThunk(
  "profile/saveBank",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/student/profile/bank", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 4️⃣ Save Other Details
export const saveOtherDetails = createAsyncThunk(
  "profile/saveOther",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/student/profile/other", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 5️⃣ Upload Documents
export const uploadDocuments = createAsyncThunk(
  "profile/uploadDocuments",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/student/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 6️⃣ Get Full Profile
export const fetchStudentProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/student/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessionData("studentProfile", res.data);
      return res.data;

    } catch (err) {
      console.log("PROFILE ERROR:", err.response);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const finalSubmitProfile = createAsyncThunk(
  "profile/finalSubmit",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/student/final-submit");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to submit profile");
    }
  }
);

/* ============================
   SLICE
   ============================ */

const profileSlice = createSlice({
  name: "profile",
  initialState: {
   profile: null,
    education: null,
    preferences: [],
    loading: false,
    error: null,
    successMessage: null
    
  },
  reducers: {
    clearProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
    logoutProfile: (state) => {
      state.profile = null;
      removeSessionData("studentProfile");
    }
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Save Basic
      .addCase(profileBasicDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(profileBasicDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(profileBasicDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Save Family
      .addCase(saveFamilyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFamilyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(saveFamilyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Save Bank
      .addCase(saveBankDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(saveBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Save Other
      .addCase(saveOtherDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveOtherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(saveOtherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Upload Documents
      .addCase(uploadDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(uploadDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch Profile
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchStudentProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.profile = action.payload.profile;
  state.education = action.payload.education;
  state.preferences = action.payload.preferences;

  setSessionData("studentProfile", action.payload);
})


      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(finalSubmitProfile.fulfilled, (state, action) => {
  state.successMessage = action.payload;
  state.profile.profileLocked = true;
});
  }
});

/* ============================
   EXPORTS
   ============================ */

export const {
  clearProfileState,
  logoutProfile
} = profileSlice.actions;

export default profileSlice.reducer;
