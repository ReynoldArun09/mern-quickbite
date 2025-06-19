import { cn } from "@/lib/utils";
import { useGetUserCartItemsQuery } from "@/services/cart/cart-query";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../../ui/badge";
import { Button, buttonVariants } from "../../../ui/button";
import { Separator } from "../../../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../ui/sheet";
import CartDetails from "./cart-details";
import CartProducts from "./cart-products";

export default function CartSheet() {
  const { data } = useGetUserCartItemsQuery();

  const ItemCount = data ? data?.products?.length : 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <ShoppingCartIcon />
          <Badge className="absolute top-0 rounded-full text-xs">{ItemCount}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart {ItemCount}</SheetTitle>
          <Separator />
        </SheetHeader>
        {data && ItemCount > 0 ? (
          <>
            <CartProducts cartItems={data} />
            <CartDetails cartTotal={data?.cartTotal} />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <ShoppingCartIcon className="text-muted-foreground mb-4 size-16" aria-hidden="true" />
            <div className="text-muted-foreground text-xl font-medium">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                aria-label="Add items to your cart to checkout"
                to="/"
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
