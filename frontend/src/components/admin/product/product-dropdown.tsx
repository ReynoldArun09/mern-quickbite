import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteProductMutation, useEnableDisableProductMutation } from "@/services/admin/admin-mutation";
import { Ellipsis } from "lucide-react";

interface ProductDropDownProps {
  productId: string;
}

export default function ProductDropDownMenu({ productId }: ProductDropDownProps) {
  const { mutate: deleteProduct } = useDeleteProductMutation();
  const { mutate: toggleProduct } = useEnableDisableProductMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => deleteProduct(productId)}>Delete Product</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toggleProduct(productId)}>Toggle Product</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
