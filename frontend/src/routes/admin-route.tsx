import LoadingSpinner from "@/components/common/loading-spinner";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user && user.role === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
