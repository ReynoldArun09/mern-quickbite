import { Button } from "@/components/ui/button";
import { useRemoveToCartMutation, useUpdateCartCountOptimistic } from "@/services/cart/cart-mutation";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

interface CartButtonsProps {
  productId: string;
  count: number;
}

export default function CartButtons({ productId, count }: CartButtonsProps) {
  const { isPending, mutate: removeFromCart } = useRemoveToCartMutation();

  const { mutate: updateCartItem } = useUpdateCartCountOptimistic();

  const handleDelete = () => {
    if (!isPending) removeFromCart(productId);
  };

  const handleIncrement = () => {
    updateCartItem({
      productId,
      count: count + 1,
    });
  };

  const handleDecrement = () => {
    if (count <= 1) return;
    updateCartItem({
      productId,
      count: count - 1,
    });
  };

  return (
    <div className="flex gap-10">
      <div className="space-x-2.5">
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-r-none"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          <MinusIcon className="size-3" aria-hidden="true" />
        </Button>
        <span className="min-w-[1.5rem] text-center">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-l-none"
          onClick={handleIncrement}
          aria-label="Increase Quantity"
        >
          <PlusIcon className="size-3" aria-hidden="true" />
        </Button>
      </div>
      <div>
        <Button
          variant="destructive"
          size="icon"
          className="size-8"
          onClick={handleDelete}
          aria-label="remove from cart"
        >
          <TrashIcon className="size-3" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
