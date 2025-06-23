import LoadingSpinner from "@/components/common/loading-spinner";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
