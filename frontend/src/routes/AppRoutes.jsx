import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layouts from "../pages/Layouts";
import OtpVerify from "../pages/auth/OtpVerify";

const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const Loader = () => <div className="loader">Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerify />} />

        {/* Protected / Layout routes */}
        <Route element={<Layouts />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
