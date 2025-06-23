import { useQuery } from "@tanstack/react-query";
import {
  getAllProductsApi,
  getNonVegProductsApi,
  getRecentlyAddedProductsApi,
  getVegProductsApi,
  searchProductsApi,
} from "./products-api";

import { PRODUCT_QUERY_KEYS } from "./products-constants";

export function useGetAllProductsQuery() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.ALL_PRODUCTS,
    queryFn: getAllProductsApi,
  });
}

export function useGetVegProductsQuery() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.VEG_PRODUCTS,
    queryFn: getVegProductsApi,
    staleTime: Infinity,
  });
}

export function useGetNonVegProductsQuery() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.NONVEG_PRODUCTS,
    queryFn: getNonVegProductsApi,
    staleTime: Infinity,
  });
}

export function useGetRecentlyAddedProductsQuery() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.RECENT_PRODUCTS,
    queryFn: getRecentlyAddedProductsApi,
    staleTime: Infinity,
  });
}

export function useSearchProductsQuery(searchTerm: string) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.SEARCH_PRODUCTS(searchTerm),
    queryFn: () => searchProductsApi(searchTerm),
    enabled: !!searchTerm,
  });
}
