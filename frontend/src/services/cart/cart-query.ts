import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserCartItemsApi } from "./cart-api";
import { CART_QUERY_KEYS } from "./cart-constants";

export function useGetUserCartItemsQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: CART_QUERY_KEYS.GET_USER_CART,
    queryFn: getUserCartItemsApi,
    enabled: Boolean(user),
  });
}
