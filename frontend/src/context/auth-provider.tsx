import { createContext } from "react";
import { useAuthQuery } from "../services/auth/auth-query";
import type { UserType } from "../services/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
};

const AuthProviderContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const { data: user, isLoading } = useAuthQuery();

  return <AuthProviderContext.Provider value={{ isLoading, user }}>{children}</AuthProviderContext.Provider>;
}

export { AuthProvider, AuthProviderContext };
