import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserCartItemsApi } from "./cart-api";

export function useGetUserCartItemsQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["get-cart-key"],
    queryFn: getUserCartItemsApi,
    enabled: Boolean(user),
  });
}
