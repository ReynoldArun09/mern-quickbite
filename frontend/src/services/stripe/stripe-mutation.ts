import { useMutation } from "@tanstack/react-query";
import { clearCartAfterPaymentApi, handlePaymentApi } from "./stripe-api";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationKey: ["stripe-checkout-key"],
    mutationFn: handlePaymentApi,
  });
}

export function useClearCartAfterPaymentMutation() {
  return useMutation({
    mutationKey: ["clear-cart-key"],
    mutationFn: clearCartAfterPaymentApi,
  });
}
