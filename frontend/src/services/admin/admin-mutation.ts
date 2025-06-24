import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUnblockCustomerApi, deleteCustomerApi, deleteProductApi, enableDisableProductApi } from "./admin-api";
import { ADMIN_MUTATION_KEYS, ADMIN_QUERY_KEYS } from "./admin-constants";

export function useDeleteCustomerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ADMIN_MUTATION_KEYS.DELETE_CUSTOMER,
    mutationFn: deleteCustomerApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.ADMIN_CUSTOMERS });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ADMIN_MUTATION_KEYS.DELETE_PRODUCT,
    mutationFn: deleteProductApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.ADMIN_PRODUCTS });
    },
  });
}

export function useEnableDisableProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ADMIN_MUTATION_KEYS.ENABLE_DISABLE_PRODUCT,
    mutationFn: enableDisableProductApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.ADMIN_PRODUCTS });
    },
  });
}

export function useBlockUnBlockCustomerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ADMIN_MUTATION_KEYS.BLOCK_UNBLOCK_CUSTOMER,
    mutationFn: blockUnblockCustomerApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.ADMIN_CUSTOMERS });
    },
  });
}
