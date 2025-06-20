import LoadingSpinner from "@/components/common/loading-spinner";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  if (!user) return <Outlet />;

  return <Navigate to="/" replace />;
}
