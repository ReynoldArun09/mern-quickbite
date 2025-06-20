import { useMutation } from "@tanstack/react-query";
import { handlePaymentApi } from "./stripe-api";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationKey: ["stripe-checkout-key"],
    mutationFn: handlePaymentApi,
  });
}
