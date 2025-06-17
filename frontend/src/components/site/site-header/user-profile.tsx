import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useSignOutMutation } from "@/services/api/auth-mutation";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export default function UserProfile() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const { isPending, mutate } = useSignOutMutation();

  const SignOut = () => {
    console.log("clicked");
    if (isPending) return;
    mutate();
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"} className="rounded-full">
              <CircleUser className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isAdmin && (
              <Link to="/dashboard/products">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={SignOut} disabled={isPending}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth/sign-in" className={cn(buttonVariants({ variant: "default" }))}>
          Sign In
        </Link>
      )}
    </>
  );
}
