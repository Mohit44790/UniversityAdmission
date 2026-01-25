import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { profile, loading } = useSelector((state) => state.profile);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  useEffect(() => {
    if (!profile) {
      dispatch(fetchStudentProfile());
    }
  }, [dispatch, profile]);

  if(loading){
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-600">
<div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
<p className="mt-4 text-lg">Loading Dashboard...</p>
      </div>
    )
  }


  // profile missing
  if (!profile) {
    return (
      <DashboardMessage 
      title = "Complete your Profile first"
      description = "Please complete your profile to access the dashboard."
 buttonText="Complete Profile"
        buttonAction={() => navigate("/profile")}
        currentYear={currentYear}
        nextYear={nextYear}
      />
    )
  } 

  // profile Incomplete 
  const profileCompleted = 
   profile.fullName &&
   profile.alternateMobile &&
   profile.permanentAddress &&
   profile.gender;

    if (!profileCompleted) {
    return (
      <DashboardMessage
        title="Profile Incomplete"
        description="Some required details are still missing. Please update your profile."
        buttonText="Continue Profile"
        buttonAction={() => navigate("/profile")}
        currentYear={currentYear}
        nextYear={nextYear}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
         <p className="text-3xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          DSEU Admission Portal {currentYear}–{nextYear}
        </p>

      </div>

      {/* card  */}
       <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, <span className="text-blue-600">{profile.fullName}</span>
        </h2>

        <p className="text-gray-700 mt-3 mb-6">
          Your profile is verified and complete. You may continue your application.
        </p>

        <div className="flex gap-4">
 <button
    onClick={() => navigate("/profile")}
    className="
      px-6 py-3 font-semibold text-white rounded-xl shadow-lg cursor-pointer
      bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600
      hover:from-cyan-500 hover:via-blue-600 hover:to-indigo-700   
    "
  >
    Edit Profile
  </button>
   {/* View Profile */}
   {/* View Profile */}
  <button
    onClick={() => navigate("/view-profile")}
    className="
      px-6 py-3 font-semibold text-white rounded-xl shadow-lg cursor-pointer
      bg-linear-to-r from-orange-500 via-orange-400 to-red-500
      hover:from-orange-600 hover:via-orange-600 hover:to-red-600
         "
  >
    View Profile
  </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const DashboardMessage =({
  title,
  description,
  buttonText,
  buttonAction,
  currentYear,
  nextYear
}) =>{
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <p className="text-3xl font-extrabold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
        DSEU Admission Portal {currentYear}-{nextYear}
      </p>
      <div className="bg-white/90 backdrop-blur-lg border border-gray-300 text-gray-800 px-10 py-8 rounded-2xl shadow-2xl max-w-md text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-3 text-sm text-gray-600">{description}</p>
        <button
          onClick={buttonAction}
          className="mt-6 w-full py-3 cursor-pointer bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
