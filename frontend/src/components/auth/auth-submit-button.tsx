import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthSubmitButtonProps {
  authType: "SIGN_IN" | "SIGN_UP" | "RESET";
  isPending: boolean;
}

const buttonText = {
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
  RESET: "Reset Password",
};

export default function AuthSubmitButton({ authType, isPending }: AuthSubmitButtonProps) {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
      {isPending ? <Loader2 /> : buttonText[authType]}
    </Button>
  );
}
