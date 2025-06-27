export const BASE_ROUTE = {
  HOME: "/",
  MENU: "/menu",
};

export const AUTH_ROUTES = {
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  FORGOT: "/auth/forgot-password",
  RESET: "/auth/reset-password/:token",
};

export const PROTECTED_ROUTES = {
  CART: "/cart",
  CHECKOUT: "/checkout",
  PURCHASE_SUCCESS: "/purchase-success",
  PURCHASE_CANCEL: "/purchase-cancel",
};

export const ADMIN_ROUTES = {
  DASHBOARD: "/admin-dashboard",
};
