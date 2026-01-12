import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import profileReducer from "../redux/slices/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
