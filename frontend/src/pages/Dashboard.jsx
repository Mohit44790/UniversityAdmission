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
   profile.permanentAdress &&
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
        <p>
          DSEU Admission Portal {currentYear}-{nextYear}
        </p>

      </div>

      {/* card  */}
      <div>
        <h2>
          Welcome
        </h2>
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
    <div>
      <p>
        DSEU Admission Portal {currentYear}-{nextYear}
      </p>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={buttonAction}>{buttonText}</button>
      </div>
    </div>
  )
}
