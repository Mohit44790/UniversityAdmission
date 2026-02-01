import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import profileReducer from "../redux/slices/profileSlice";
import programLevelReducer from "../redux/slices/programLevelSlice";
import programReducer from "../redux/slices/programSlice";
import collegeReducer from "../redux/slices/collegeSlice";
import programCollegeReducer from "../redux/slices/programCollegeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  programLevel: programLevelReducer,
    program: programReducer,
    college: collegeReducer,
    programCollege: programCollegeReducer,
});


export default rootReducer;
