import { useContext } from "react";
import { AuthProviderContext } from "../context/auth-provider";

export default function useAuth() {
  const context = useContext(AuthProviderContext);

  if (!context) {
    console.log("Auth Context:", context);
    throw new Error("useAuth must be used within a AuthProviderContext");
  }

  return context;
}
