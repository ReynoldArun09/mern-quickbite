import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../../ui/button";

export default function CartSheet() {
  return (
    <div>
      <Button variant={"outline"} size={"icon"}>
        <ShoppingCartIcon />
      </Button>
    </div>
  );
}
