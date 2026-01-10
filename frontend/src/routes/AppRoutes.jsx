import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";


const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));


const Loader = () => <div className="loader">Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
