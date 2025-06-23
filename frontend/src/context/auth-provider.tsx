import { createContext } from "react";
import { useAuthQuery } from "../services/auth/auth-query";
import type { userData } from "../services/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: userData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isAdmin: boolean;
};

const AuthProviderContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const { data: user, isLoading, error, isError } = useAuthQuery();

  const authState: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    error: isError ? (error as Error)?.message || "Authentication error" : null,
  };

  return <AuthProviderContext.Provider value={authState}>{children}</AuthProviderContext.Provider>;
}

export { AuthProvider, AuthProviderContext };
