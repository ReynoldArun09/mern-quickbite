import LoadingSpinner from "@/components/common/loading-spinner";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated && isAdmin) {
    return <Outlet />;
  }

  if (!isAuthenticated && !isAdmin) {
    const encoded = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth/sign-in?returnUrl=${encoded}`} replace />;
  }
}
