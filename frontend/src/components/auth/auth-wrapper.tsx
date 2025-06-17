import { RESET_DES, RESET_TITLE, SIGN_IN_DES, SIGN_IN_TITLE, SIGN_UP_DES, SIGN_UP_TITLE } from "@/constants/auth-data";
import { Link } from "react-router-dom";
import SiteLogo from "../common/site-logo";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface AuthWrapperProps {
  children: React.ReactNode;
  authType: "SIGN_IN" | "SIGN_UP" | "RESET";
}

export default function AuthWrapper({ children, authType }: AuthWrapperProps) {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="items-center text-center">
        <SiteLogo />
        <CardTitle className="text-2xl">
          {authType === "SIGN_IN" ? SIGN_IN_TITLE : authType === "SIGN_UP" ? SIGN_UP_TITLE : RESET_TITLE}
        </CardTitle>
        <CardDescription>
          {authType === "SIGN_IN" ? SIGN_IN_DES : authType === "SIGN_UP" ? SIGN_UP_DES : RESET_DES}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center">
        {authType === "SIGN_IN" && (
          <Link to="/auth/forgot-password">
            <Button variant="link" className="text-sm">
              Forgot Password?
            </Button>
          </Link>
        )}
        <p className="text-sm text-muted-foreground">
          {authType === "SIGN_IN" ? "Don't have an account?" : authType === "SIGN_UP" ? "Already have an account?" : ""}
          <Link
            to={authType === "SIGN_IN" ? "/auth/sign-up" : "/auth/sign-in"}
            className="font-medium text-primary hover:underline ml-1"
          >
            {authType === "SIGN_IN" ? "Sign up" : authType === "SIGN_UP" ? "Sign in" : "Back to Sign In"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
