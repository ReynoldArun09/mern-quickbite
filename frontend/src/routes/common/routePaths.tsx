import PurchaseCancelPage from "@/pages/site/purchase-cancel";
import PurchaseSuccessPage from "@/pages/site/purchase-success";
import { lazy } from "react";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routes";

const HomePage = lazy(() => import("@/pages/site/home-page"));
const SignInPage = lazy(() => import("@/pages/auth/signin-page"));
const SignUpPage = lazy(() => import("@/pages/auth/signup-page"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password-page"));
const CartPage = lazy(() => import("@/pages/site/cart-page"));
const CheckoutPage = lazy(() => import("@/pages/site/checkout-page"));
const MenuPage = lazy(() => import("@/pages/site/menu-page"));

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
  { path: PROTECTED_ROUTES.PURCHASE_SUCCESS, element: <PurchaseSuccessPage /> },
  { path: PROTECTED_ROUTES.PURCHASE_CANCEL, element: <PurchaseCancelPage /> },
];
