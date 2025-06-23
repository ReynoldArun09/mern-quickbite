import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/common/loading-spinner";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    const encoded = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth/sign-in?returnUrl=${encoded}`} replace />;
  }

  return <Outlet />;
}
