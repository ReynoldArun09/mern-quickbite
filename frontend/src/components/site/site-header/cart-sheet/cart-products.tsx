import { ScrollArea } from "@/components/ui/scroll-area";
import type { CartResponse } from "@/services/types";
import CartButtons from "./cart-buttons";

interface CartProductsProps {
  cartItems: CartResponse;
}

export default function CartProducts({ cartItems }: CartProductsProps) {
  return (
    <ScrollArea className="h-[75vh]">
      {cartItems.products.map((product) => (
        <div key={product.product._id} className="flex items-center justify-around mt-2">
          <div>
            <img src={product?.product.image} alt="img" className="size-20 object-cover hover:scale-101" />
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="font-bold text-sm">{product?.product.name}</p>
              <p className="text-primary font-bold tracking-widest text-md">Price: ${product?.product.price}</p>
            </div>
            <CartButtons productId={product?.product._id} count={product?.count} />
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
