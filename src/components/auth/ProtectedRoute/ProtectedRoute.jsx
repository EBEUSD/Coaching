import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ProtectedRoute({ children, role = "any" }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) return null;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (role === "staff" && user.role !== "staff" && user.role !== "owner") {
    return <Navigate to="/dashboard/player" replace />;
  }

  return children;
}
