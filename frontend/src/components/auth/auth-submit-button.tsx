import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface AuthSubmitButtonProps {
  authType: "SIGN_IN" | "SIGN_UP" | "RESET";
  isPending: boolean;
}

export default function AuthSubmitButton({ authType, isPending }: AuthSubmitButtonProps) {
  return (
    <Button type="submit" className="w-full cursor-pointer">
      {isPending ? <Loader2 /> : <>{authType === "SIGN_IN" ? "Sign In" : "Sign Up"}</>}
    </Button>
  );
}
