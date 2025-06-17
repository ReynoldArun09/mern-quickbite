import type { ProductType } from "@/services/types";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";

interface SiteProductCardProps {
  item: ProductType;
}

export default function SiteProductCard({ item }: SiteProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <img src={item.image} alt={item.name} className="h-40 w-full hover:scale-101" />
      </CardHeader>
      <CardHeader>
        <p className="truncate text-xl font-bold tracking-wider">{item.name}</p>
      </CardHeader>
      <CardFooter>
        <p className="text-sm tracking-wide line-clamp-2">{item.description}</p>
      </CardFooter>
      <CardFooter className="flex justify-between">
        <p className="text-xl font-semibold">${item.price}</p>
        <p className="font-semibold underline uppercase">{item.category}</p>
      </CardFooter>
      <CardFooter>
        <Button className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
