import LoadingSpinner from "@/components/common/loading-spinner";
import SiteLogo from "@/components/common/site-logo";
import { buttonVariants } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useGetUserCartItemsQuery } from "@/services/cart/cart-query";
import { useClearCartAfterPaymentMutation } from "@/services/stripe/stripe-mutation";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PurchaseSuccessPage() {
  const { mutate, isPending } = useClearCartAfterPaymentMutation();
  const { user } = useAuth();
  const { data } = useGetUserCartItemsQuery();
  const isProductPresent = Boolean(data?.products.length);

  useEffect(() => {
    if (!user && !isProductPresent) return;
    mutate();
  }, [isProductPresent, mutate, user]);

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <section className="flex flex-col space-y-2.5 items-center justify-center min-h-screen">
      <SiteLogo />
      <h1 className="text-xl">Purchase Successfull</h1>
      <p className="text-md tracking-wider">Thank you for your order. We're processing it now.</p>
      <div className="py-5">
        <Link to="/" className={cn(buttonVariants({ variant: "default" }))}>
          Continue Shopping <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
