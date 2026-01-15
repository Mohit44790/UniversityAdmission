import { Navigate, Outlet } from "react-router-dom";
import { getSessionData } from "../utils/helpers";

const ProtectedRoute = () => {
  const token = getSessionData("token"); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
