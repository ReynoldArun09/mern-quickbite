import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export default function CartDetails({ cartTotal }: { cartTotal: number }) {
  return (
    <div>
      <div className="px-4 space-y-1">
        <Separator />
        <div>
          <span className="text-primary font-bold">Free Delivery</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-bold text-md">Total</span>
          <span className="text-primary font-extrabold">${cartTotal}</span>
        </div>
      </div>
      <SheetFooter>
        <SheetTrigger asChild>
          <Link
            to="/cart"
            className={buttonVariants({
              size: "sm",
              className: "w-full",
            })}
          >
            View Cart Page
          </Link>
        </SheetTrigger>
      </SheetFooter>
    </div>
  );
}
