import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);

  // Local state for username to show immediately when profile is fetched
  const [userName, setUserName] = useState(user?.email || "User");

  useEffect(() => {
    if (!profile) {
      dispatch(fetchStudentProfile());
    } else if (profile.fullName) {
      // Update username when profile is fetched
      setUserName(profile.fullName);
    }
  }, [dispatch, profile]);

  const isProfileComplete = profile?.isProfileComplete || false;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <div className="border p-4 rounded-md w-full border-gray-400">
          <h2 className="font-semibold text-lg">{userName}</h2>

          {isProfileComplete ? (
            <p className="text-green-600">✅ Profile completed</p>
          ) : (
            <p className="text-yellow-600">
              Complete your profile first
            </p>
          )}

          <div className="gap-2 flex mt-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-8 border cursor-pointer rounded-md py-2 bg-green-500 text-white"
            >
              Profile
            </button>
            <button
              onClick={() => navigate("/edit-profile")}
              className="px-8 border rounded-md py-2 bg-blue-500 text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {!isProfileComplete && (
          <h3 className="mt-4 text-red-600">
            Your profile is incomplete. Please complete your profile to access
            all features.
          </h3>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
