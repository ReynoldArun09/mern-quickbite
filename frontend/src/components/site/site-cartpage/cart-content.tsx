import SiteLogo from "@/components/common/site-logo";
import CartButtons from "@/components/site/site-header/cart-sheet/cart-buttons";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CartProduct } from "@/services/types";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CartContentProps {
  products: CartProduct[];
}

export default function CartContent({ products }: CartContentProps) {
  return (
    <div className="flex-1 px-10">
      <div className="flex items-center justify-between border-b py-5">
        <span className="text-2xl font-bold ml-4">
          <SiteLogo />
          Shopping Cart
        </span>
        <span>Cart Items: {products?.length || 0}</span>
      </div>
      <ScrollArea className="h-[85%]">
        <div className="grid grid-cols-4 gap-x-56 border-b p-5">
          <span className="w-[400px]">Product Details</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
        </div>
        {products.length > 0 ? (
          products.map((product) => (
            <div className="grid grid-cols-4 items-center gap-x-56 px-5 pt-2" key={product.product._id}>
              <div className="flex w-[400px] gap-5 py-2">
                <img src={product.product.image} className="size-[100px]" alt={product.product.name} />
                <div className="mt-6 flex flex-col">
                  <span>{product.product.name}</span>
                  <span>{product.product.category}</span>
                </div>
              </div>
              <div className="w-[400px]">
                <CartButtons productId={product.product._id} count={product.count} />
              </div>
              <span>${product.product.price}</span>
              <span>${product.count * product.product.price}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[50vh] flex-col gap-2">
            <ShoppingCartIcon className="text-muted-foreground mb-4 size-16" aria-hidden="true" />
            <div className="text-muted-foreground text-xl font-medium">Your cart is empty</div>
            <Link to="/" className="text-primary underline underline-offset-4 font-bold">
              Back to shopping?
            </Link>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
