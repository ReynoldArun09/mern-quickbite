import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/loading-spinner";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  console.log(user);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
