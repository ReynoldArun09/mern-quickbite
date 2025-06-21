import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlockUnBlockCustomerMutation, useDeleteCustomerMutation } from "@/services/admin/admin-mutation";
import { Ellipsis } from "lucide-react";

interface CustomerDropDownProps {
  userId: string;
}

export default function CustomerDropDownMenu({ userId }: CustomerDropDownProps) {
  const { mutate: blockCustomer } = useBlockUnBlockCustomerMutation();
  const { mutate: deleteCustomer } = useDeleteCustomerMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => blockCustomer(userId)}>Block Customer</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteCustomer(userId)}>Delete Customer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
