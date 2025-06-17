import { use } from "react";
import { AuthProviderContext } from "../context/auth-provider";

export default function useAuth() {
  const context = use(AuthProviderContext);

  if (!context) {
    throw Error("useAuth must be used within a AuthProviderContext");
  }

  return context;
}
