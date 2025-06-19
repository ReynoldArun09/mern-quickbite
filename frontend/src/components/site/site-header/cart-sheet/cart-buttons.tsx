import { useRemoveToCartMutation, useUpdateCartCountOptimistic } from "@/services/cart/cart-mutation";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../ui/button";

interface CartButtonsProps {
  productId: string;
  count: number;
}

export default function CartButtons({ productId, count }: CartButtonsProps) {
  const { isPending, mutate } = useRemoveToCartMutation();

  const { mutate: updateCartItem } = useUpdateCartCountOptimistic();

  const handleDelete = () => {
    if (isPending) return;
    mutate(productId);
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
        <Button variant="outline" size="icon" className="size-8 rounded-r-none" onClick={handleDecrement}>
          <MinusIcon className="size-3" aria-hidden="true" />
        </Button>
        <span>{count}</span>
        <Button variant="outline" size="icon" className="size-8 rounded-l-none" onClick={handleIncrement}>
          <PlusIcon className="size-3" aria-hidden="true" />
        </Button>
      </div>
      <div>
        <Button variant="destructive" size="icon" className="size-8" onClick={handleDelete}>
          <TrashIcon className="size-3" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
