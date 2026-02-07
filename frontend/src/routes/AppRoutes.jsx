import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import OtpVerify from "../pages/auth/OtpVerify";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProfileLayout from "../pages/profileComplete/ProfileLayout";
import Profile from "../pages/profileComplete/Profile";
import BankDetails from "../pages/profileComplete/BankDetails";
import Family from "../pages/profileComplete/Family";
import OtherDetails from "../pages/profileComplete/OtherDetails";
import UploadDocuments from "../pages/profileComplete/UploadDocuments";
import PreferencePage from "../components/program/PreferencePage";

const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard")); // [NEW]
const Layouts = lazy(() => import("../pages/Layouts"));

const Loader = () => <div className="loader">Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* 🔓 Public */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Protected */}
      {/* STUDENT ROUTES */}
<Route element={<ProtectedRoute role="STUDENT" />}>
  <Route element={<Layouts />}>
    <Route path="/dashboard" element={<Dashboard />} />
      <Route path="student/preferences" element={<PreferencePage />} />

    <Route path="/profile" element={<ProfileLayout />}>
      <Route index element={<Profile />} />
      <Route path="bank" element={<BankDetails />} />
      <Route path="family" element={<Family />} />
      <Route path="other" element={<OtherDetails />} />
      <Route path="documents" element={<UploadDocuments />} />
    </Route>
  </Route>
</Route>
{/* ADMIN ROUTES */}
<Route element={<ProtectedRoute role="ADMIN" />}>
  <Route element={<Layouts />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
  </Route>
</Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
