import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/slices/profileSlice";


const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchStudentProfile());
    }
  }, [dispatch, profile]);

  const isProfileComplete = profile?.isProfileComplete;
  const userName = profile?.fullName || user?.email || "User";

  return (
    <div>
      <div className="border p-4 rounded-md w-full border-gray-400">
        <h2 className="font-semibold text-lg">
          {userName}
        </h2>

        {isProfileComplete ? (
          <p className="text-green-600">
            ✅ Profile completed
          </p>
        ) : (
          <p className="text-yellow-600">
            Complete your profile first
          </p>
        )}

        <div className="gap-2 flex mt-3">
          <button className="px-8 border rounded-md py-2 bg-green-500 text-white">
            Profile
          </button>
          <button className="px-8 border rounded-md py-2 bg-blue-500 text-white">
            Edit Profile
          </button>
        </div>
      </div>

      {!isProfileComplete && (
        <h3 className="mt-4 text-red-600">
          Your profile is incomplete. Please complete your profile to access all features.
        </h3>
      )}
    </div>
  );
};

export default Profile;
