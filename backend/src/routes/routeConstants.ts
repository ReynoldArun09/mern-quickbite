export const AUTH_ROUTES = {
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  SIGN_OUT: "/signout",
  VERIFY_USER: "/verify",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
};

export const PRODUCT_ROUTES = {
  ALL_PRODUCTS: "/all-products",
  VEG_PRODUCTS: "/veg-products",
  NONVEG_PRODUCTS: "/nonveg-products",
  RECENTLY_ADDED: "/recently-added",
  SEARCH: "/search/:searchTerm",
};

export const CART_ROUTES = {
  ADD_TO_CART: "/add-cart",
  GET_CART: "/get-cart",
  REMOVE_FROM_CART: "/remove-product/:productId",
  UPDATE_CART: "/update-cart",
};

export const ADMIN_ROUTES = {
  GET_CUSTOMERS: "/get-customers",
  GET_PRODUCTS: "/get-products",
  ENABLE_DISABLE_PRODUCT: "/enable-disable/:productId",
  DELETE_PRODUCT: "/delete/:productId",
  DELETE_CUSTOMER: "/user-delete/:userId",
  BLOCK_UNBLOCK_USER: "/block-unblock-user/:userId",
  CREATE_PRODUCT: "/create-product",
};

export const PAYMENT_ROUTES = {
  CREATE_CHECKOUT_SESSION: "/create-checkout-session",
  CLEAR_CART: "/clear-cart",
};
