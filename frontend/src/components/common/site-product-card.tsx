import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useAddToCartMutation } from "@/services/cart/cart-mutation";
import type { ProductType } from "@/services/types";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

interface SiteProductCardProps {
  item: ProductType;
}

export default function SiteProductCard({ item }: SiteProductCardProps) {
  const { isPending, mutate: addToCart } = useAddToCartMutation();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
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
      <CardHeader className="relative">
        <img src={item.image} alt={item.name} loading="lazy" className="h-40 w-full object-cover hover:scale-101" />
        {!item.available && <Badge className="absolute top-2 left-10">{"Not Available"}</Badge>}
      </CardHeader>
      <CardContent className="space-y-2.5 tracking-wide">
        <div>
          <p className="truncate text-xl font-bold tracking-wider">{item.name}</p>
          <p className="text-sm tracking-wide line-clamp-2">{item.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="line-through">${item.originalPrice}</p>
            <p className="font-bold text-primary">${item.price}</p>
          </div>

          <Link to={`/menu?q=${item.category}`} className="uppercase underline font-bold">
            {item.category}
          </Link>
        </div>
        <div>
          <Badge variant={"outline"}>{item.vegetarian ? "Veg" : "Non-Veg"}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isPending || !item.available}
          aria-label="add to cart"
        >
          {isPending ? <Loader2 /> : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
