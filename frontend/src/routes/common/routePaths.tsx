import { lazy } from "react";
import { AUTH_ROUTES, BASE_ROUTE } from "./routes";

const HomePage = lazy(() => import("@/pages/site/home-page"));
const SignInPage = lazy(() => import("@/pages/auth/signin-page"));
const SignUpPage = lazy(() => import("@/pages/auth/signup-page"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password-page"));
export const baseRoutePaths = [{ path: BASE_ROUTE.HOME, element: <HomePage /> }];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignInPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUpPage /> },
  { path: AUTH_ROUTES.RESET, element: <ForgotPasswordPage /> },
];
