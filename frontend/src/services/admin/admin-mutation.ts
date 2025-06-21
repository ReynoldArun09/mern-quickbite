import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUnblockCustomer, deleteCustomer, deleteProduct, enableDisableProduct } from "./admin-api";

export function useDeleteCustomerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin-delete-customer-key"],
    mutationFn: deleteCustomer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-get-customer-key"] });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product-key"],
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-get-products-key"] });
    },
  });
}

export function useEnableDisableProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin-enDis-product-key"],
    mutationFn: enableDisableProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-get-products-key"] });
    },
  });
}

export function useBlockUnBlockCustomerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin-bckUbck-customer-key"],
    mutationFn: blockUnblockCustomer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-get-customer-key"] });
    },
  });
}
