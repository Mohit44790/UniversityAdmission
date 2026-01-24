import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token, validating } = useSelector((state) => state.auth);

  if (validating) {
    return <div>Checking session...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
