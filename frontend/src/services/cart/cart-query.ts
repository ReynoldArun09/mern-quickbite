import { useQuery } from "@tanstack/react-query";
import { getUserCartItemsApi } from "./cart-api";

export function useGetUserCartItemsQuery() {
  return useQuery({
    queryKey: ["get-cart-key"],
    queryFn: getUserCartItemsApi,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
