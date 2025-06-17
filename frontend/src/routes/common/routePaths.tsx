import CartPage from "@/pages/site/cart-page";
import CheckoutPage from "@/pages/site/checkout-page";
import MenuPage from "@/pages/site/menu-page";
import { lazy } from "react";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routes";

const HomePage = lazy(() => import("@/pages/site/home-page"));
const SignInPage = lazy(() => import("@/pages/auth/signin-page"));
const SignUpPage = lazy(() => import("@/pages/auth/signup-page"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password-page"));

export const baseRoutePaths = [
  { path: BASE_ROUTE.HOME, element: <HomePage /> },
  { path: BASE_ROUTE.MENU, element: <MenuPage /> },
];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignInPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUpPage /> },
  { path: AUTH_ROUTES.RESET, element: <ForgotPasswordPage /> },
];

export const protectedRoutesPaths = [
  { path: PROTECTED_ROUTES.CART, element: <CartPage /> },
  { path: PROTECTED_ROUTES.CHECKOUT, element: <CheckoutPage /> },
];
