import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchStudentProfile());
    }
  }, [dispatch, profile]);

  const isProfileComplete = profile?.isProfileComplete || false;

  const alternateEmail =
    profile?.alternateEmail ||
    user?.userResponse?.alternateEmail ||
    user?.accessToken?.alternateEmail ||
    "N/A";

  const alternateMobile =
    profile?.alternateMobile ||
    profile?.alternate_mobile ||
    "Not provided";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome 👋
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading profile...</p>
        ) : (
          <>
            {/* USER INFO */}
            <div className="space-y-2 mb-4">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {profile?.fullName || "User"}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {alternateEmail}
              </p>

              <p>
                <span className="font-semibold">
                  Alternate Mobile:
                </span>{" "}
                {alternateMobile}
              </p>
            </div>

            {/* PROFILE STATUS */}
            <div className="mb-4">
              {isProfileComplete ? (
                <p className="text-green-600 font-medium">
                  ✅ Profile completed
                </p>
              ) : (
                <p className="text-yellow-600 font-medium">
                  ⚠️ Profile incomplete
                </p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
              >
                View Profile
              </button>

              <button
                onClick={() => navigate("/edit-profile")}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>

            {/* APPLY BUTTON CONDITION */}
            {!isProfileComplete &&
              alternateMobile !== "Not provided" && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 mb-3">
                    Your profile is incomplete. Please complete it to
                    apply.
                  </p>

                  <button
                    onClick={() => navigate("/apply")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
                  >
                    Apply Now
                  </button>
                </div>
              )}

            {/* If alternate mobile missing */}
            {!isProfileComplete &&
              alternateMobile === "Not provided" && (
                <p className="mt-4 text-sm text-red-500">
                  Please add an alternate mobile number to proceed
                  with application.
                </p>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
