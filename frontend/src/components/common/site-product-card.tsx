import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useAddToCartMutation } from "@/services/cart/cart-mutation";
import type { ProductType } from "@/services/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SiteProductCardProps {
  item: ProductType;
}

export default function SiteProductCard({ item }: SiteProductCardProps) {
  const { isPending, mutate: addToCart } = useAddToCartMutation();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      toast.info("You need to login to add product in cart.");
      return;
    }
    if (isPending) return;
    addToCart({
      productId: item._id,
      count: 1,
    });
  };

  return (
    <Card>
      <CardHeader>
        <img src={item.image} alt={item.name} loading="lazy" className="h-40 w-full object-cover hover:scale-101" />
      </CardHeader>
      <CardContent className="space-y-2.5 tracking-wide">
        <p className="truncate text-xl font-bold tracking-wider">{item.name}</p>
        <p className="text-sm tracking-wide line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">${item.price}</p>
          <p className="font-semibold underline uppercase">{item.category}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart} disabled={isPending} aria-label="add to cart">
          {isPending ? <Loader2 /> : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
