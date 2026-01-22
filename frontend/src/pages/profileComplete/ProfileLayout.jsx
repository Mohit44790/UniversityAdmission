// pages/profileComplete/ProfileLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ProfileStepper from "./ProfileStepper";

const ProfileLayout = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProfileStepper />
      <div className="bg-white p-6 rounded shadow mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
