import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ role }) => {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role);

  if (!token) return <Navigate to="/login" />;

  if (role && role !== userRole) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
