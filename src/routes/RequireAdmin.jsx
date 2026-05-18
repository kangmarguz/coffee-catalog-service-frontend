import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function RequireAdmin({ children }) {
  const location = useLocation();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate replace state={{ from: location }} to="/Login" />;
  }

  return children;
}

export default RequireAdmin;
