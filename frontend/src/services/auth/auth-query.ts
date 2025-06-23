import { useQuery } from "@tanstack/react-query";
import { verifyApi } from "./auth-api";
import { AUTH_QUERY_KEYS } from "./auth-constants";

export function useAuthQuery() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.VERIFY_KEY,
    queryFn: verifyApi,
  });
}
