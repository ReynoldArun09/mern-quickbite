import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartProduct, CartResponse } from "../types";
import { addToCartApi, removeFromCartApi, updateProductCountApi } from "./cart-api";
import { CART_MUTATION_KEYS, CART_QUERY_KEYS } from "./cart-constants";

export function useAddToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CART_MUTATION_KEYS.ADD_TO_CART,
    mutationFn: addToCartApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.GET_USER_CART });
    },
  });
}

export function useRemoveToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CART_MUTATION_KEYS.REMOVE_FROM_CART,
    mutationFn: removeFromCartApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.GET_USER_CART });
    },
  });
}

export function useUpdateCartCountOptimistic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CART_MUTATION_KEYS.UPDATE_CART,
    mutationFn: updateProductCountApi,
    onMutate: async ({ productId, count }) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEYS.GET_USER_CART });

      const previousCart = queryClient.getQueryData(CART_QUERY_KEYS.GET_USER_CART);

      queryClient.setQueryData(CART_QUERY_KEYS.GET_USER_CART, (old: CartResponse) => {
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
        queryClient.setQueryData(CART_QUERY_KEYS.GET_USER_CART, context.previousCart);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.GET_USER_CART });
    },
  });
}
