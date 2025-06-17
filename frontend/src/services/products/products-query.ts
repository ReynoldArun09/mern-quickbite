import { useQuery } from "@tanstack/react-query";
import {
  getAllProductsApi,
  getNonVegProductsApi,
  getRecentlyAddedProductsApi,
  getVegProductsApi,
  searchProductsApi,
} from "./products-api";

export function useGetAllProductsQuery() {
  return useQuery({
    queryKey: ["all-products-key"],
    queryFn: getAllProductsApi,
  });
}

export function useGetVegProductsQuery() {
  return useQuery({
    queryKey: ["veg-products-key"],
    queryFn: getVegProductsApi,
    staleTime: Infinity,
  });
}

export function useGetNonVegProductsQuery() {
  return useQuery({
    queryKey: ["nonveg-products-key"],
    queryFn: getNonVegProductsApi,
    staleTime: Infinity,
  });
}

export function useGetRecentlyAddedProductsQuery() {
  return useQuery({
    queryKey: ["recently-products-key"],
    queryFn: getRecentlyAddedProductsApi,
    staleTime: Infinity,
  });
}

export function useSearchProductsQuery(searchTerm: string) {
  return useQuery({
    queryKey: ["search-products-key", searchTerm],
    queryFn: () => searchProductsApi(searchTerm),
    enabled: !!searchTerm,
  });
}
