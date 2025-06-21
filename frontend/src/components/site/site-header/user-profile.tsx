import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useSignOutMutation } from "@/services/auth/auth-mutation";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const { isPending, mutate: signOut } = useSignOutMutation();

  if (!user) {
    return (
      <Link to="/auth/sign-in" className={cn(buttonVariants({ variant: "default" }))}>
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="rounded-full" aria-label="Dropdown button">
          <CircleUser className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin && (
          <Link to="/admin-dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} disabled={isPending} aria-label="Logout">
          {isPending ? "Logging out" : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
