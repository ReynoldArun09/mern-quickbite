import SiteLogo from "@/components/common/site-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RESET_DES, RESET_TITLE, SIGN_IN_DES, SIGN_IN_TITLE, SIGN_UP_TITLE } from "@/constants/auth-data";
import { Link } from "react-router-dom";

interface AuthWrapperProps {
  children: React.ReactNode;
  authType: "SIGN_IN" | "SIGN_UP" | "RESET";
}

export default function AuthWrapper({ children, authType }: AuthWrapperProps) {
  const isSignIn = authType === "SIGN_IN";
  const isSignUp = authType === "SIGN_UP";

  const title = isSignIn ? SIGN_IN_TITLE : isSignUp ? SIGN_UP_TITLE : RESET_TITLE;
  const description = isSignIn ? SIGN_IN_DES : isSignUp ? SIGN_IN_DES : RESET_DES;

  const footerText = isSignIn ? "Don't have an account?" : isSignUp ? "Already have an account?" : "";
  const footerLink = isSignIn ? { text: "Sign up", to: "/auth/sign-up" } : { text: "Sign In", to: "/auth/sign-in" };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="items-center text-center">
        <SiteLogo />
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center">
        {isSignIn && (
          <Link to="/auth/forgot-password">
            <Button variant="link" className="text-sm">
              Forgot Password?
            </Button>
          </Link>
        )}
        <p className="text-sm text-muted-foreground">
          {footerText}
          <Link to={footerLink.to} className="font-medium text-primary hover:underline ml-1">
            {footerLink.text}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
