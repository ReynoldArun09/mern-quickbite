import { useQuery } from "@tanstack/react-query";
import { getAllCustomersApi, getAllProductsForAdminApi } from "./admin-api";

export function useGetAllProductsForAdminQuery() {
  return useQuery({
    queryKey: ["admin-get-products-key"],
    queryFn: getAllProductsForAdminApi,
  });
}

export function useGetAllCustomerQuery() {
  return useQuery({
    queryKey: ["admin-get-customer-key"],
    queryFn: getAllCustomersApi,
  });
}
