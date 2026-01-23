import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileStepper from "./ProfileStepper";
import { fetchStudentProfile } from "../../redux/slices/profileSlice";
import { getProfileSteps } from "./profileProgress";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchStudentProfile()); 
    }
  }, [dispatch, profile]);

  const steps = getProfileSteps(profile);

  const routes = [
    "/profile",
    "/profile/bank",
    "/profile/family",
    "/profile/other",
    "/profile/documents",
  ];

  const currentIndex = routes.indexOf(location.pathname);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProfileStepper steps={steps} />

      <div className="bg-white p-6 rounded shadow mt-6 min-h-[300px]">
        {loading ? <p>Loading...</p> : <Outlet />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          disabled={currentIndex <= 0}
          onClick={() => navigate(routes[currentIndex - 1])}
          className="px-6 py-2 border rounded disabled:opacity-40"
        >
          Back
        </button>

        <button
          disabled={!steps[currentIndex]?.completed}
          onClick={() => navigate(routes[currentIndex + 1])}
          className="px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileLayout;
