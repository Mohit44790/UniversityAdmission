import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";
import { setSessionData, getSessionData, removeSessionData } from "../../utils/helpers";

// 1️⃣ Save Basic Details
export const saveBasicDetails = createAsyncThunk(
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


const profileSlice = createSlice({
    name: "profile",
})

export default profileSlice.reducer;