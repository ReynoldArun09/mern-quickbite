import { useQuery } from "@tanstack/react-query";
import { verifyApi } from "./auth-api";

export function useAuthQuery() {
  return useQuery({
    queryKey: ["verify-key"],
    queryFn: verifyApi,
  });
}
