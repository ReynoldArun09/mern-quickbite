import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

import { useCreateCheckoutSession } from "@/services/stripe/stripe-mutation";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import type { CartProduct } from "../../../services/types";

interface CartOrderSummaryProps {
  cartItems: CartProduct[];
  cartTotal: number;
}

export default function CartOrderSummary({ cartTotal, cartItems }: CartOrderSummaryProps) {
  const { user } = useAuth();
  const { mutateAsync } = useCreateCheckoutSession();

  console.log(cartItems);

  const handleStripePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

      const session = await mutateAsync(cartItems);

      if (!stripe) throw new Error("Stripe did not initialize");

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        toast.error("Something went wrong while processing payment");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Payment initiation failed");
      }
      toast.error("Something went wrong!!");
    }
  };

  return (
    <div className="flex flex-col justify-between border-1 py-10 text-center min-w-[250px]">
      <div className="space-y-5 border-b pb-5">
        <h1 className="text-xl font-bold text-primary">Order Summary</h1>
        <div className="space-x-4">
          <span>Cart Total</span>
          <span className="text-primary font-bold">${cartTotal}</span>
        </div>
      </div>

      <div className="border-t">
        <div className="flex justify-around py-1.5 font-bold">
          <span>Cart Total</span>
          <span className="text-primary">${cartTotal}</span>
        </div>
        <Button onClick={handleStripePayment}>{user ? "Checkout" : "Please Login"}</Button>
      </div>
    </div>
  );
}
