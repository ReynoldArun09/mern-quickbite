import { buttonVariants } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function CartOrderSummary({ cartTotal }: { cartTotal: number }) {
  const { user } = useAuth();
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
        <Link
          to="/checkout"
          className={cn(buttonVariants({ variant: user ? "default" : "secondary", size: "sm" }), "w-2/3 rounded-none")}
        >
          {user ? "Checkout" : "Please Login"}
        </Link>
      </div>
    </div>
  );
}
