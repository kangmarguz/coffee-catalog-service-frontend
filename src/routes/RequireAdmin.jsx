import { Navigate, useLocation } from "react-router-dom";
import { isAdminSessionActive } from "../auth/session";

function RequireAdmin({ children }) {
  const location = useLocation();

  if (!isAdminSessionActive()) {
    return <Navigate replace state={{ from: location }} to="/Login" />;
  }

  return children;
}

export default RequireAdmin;
