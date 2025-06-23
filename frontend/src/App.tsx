import { AuthProvider } from "./context/auth-provider";
import AppRoutes from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
