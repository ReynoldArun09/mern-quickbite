import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main className="flex items-center min-h-screen justify-center">
        <Outlet />
      </main>
    </>
  );
}
