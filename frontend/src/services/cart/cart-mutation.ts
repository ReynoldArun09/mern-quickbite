import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartProduct, CartResponse } from "../types";
import { addToCartApi, removeFromCartApi, updateProductCountApi } from "./cart-api";

export function useAddToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-to-cart-key"],
    mutationFn: addToCartApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-cart-key"] });
    },
  });
}

export function useRemoveToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove-from-cart-key"],
    mutationFn: removeFromCartApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-cart-key"] });
    },
  });
}

export function useUpdateCartCountOptimistic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-cart-count-key"],
    mutationFn: updateProductCountApi,
    onMutate: async ({ productId, count }) => {
      await queryClient.cancelQueries({ queryKey: ["get-cart-key"] });

      const previousCart = queryClient.getQueryData(["get-cart-key"]);

      queryClient.setQueryData(["get-cart-key"], (old: CartResponse) => {
        if (!old) return old;

        return {
          ...old,
          products: old.products.map((item: CartProduct) =>
            item.product._id === productId
              ? {
                  ...item,
                  count,
                }
              : item
          ),
        };
      });

      return { previousCart };
    },
    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["get-cart-key"], context.previousCart);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-cart-key"] });
    },
  });
}
