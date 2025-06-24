import { useQuery } from "@tanstack/react-query";
import { getAllCustomersApi, getAllProductsForAdminApi } from "./admin-api";
import { ADMIN_QUERY_KEYS } from "./admin-constants";

export function useGetAllProductsForAdminQuery() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.ADMIN_PRODUCTS,
    queryFn: getAllProductsForAdminApi,
  });
}

export function useGetAllCustomerQuery() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.ADMIN_CUSTOMERS,
    queryFn: getAllCustomersApi,
  });
}
