import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";
import { setSessionData, getSessionData, removeSessionData } from "../../utils/helpers";


const profileSlice = createSlice({
    name: "profile",
})

export default profileSlice.reducer;