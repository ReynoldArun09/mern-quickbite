export const CART_END_POINTS = {
  GET_USER_CART: "cart/get-cart",
  ADD_TO_CART: "cart/add-cart",
  REMOVE_FROM_CART: "cart/remove-product",
  UPDATED_CART: "cart/update-cart",
};

export const CART_QUERY_KEYS = {
  GET_USER_CART: ["q-user-cart"],
} as const;

export const CART_MUTATION_KEYS = {
  ADD_TO_CART: ["m-add-to-cart"],
  REMOVE_FROM_CART: ["m-remove-from-cart"],
  UPDATE_CART: ["m-update-cart"],
} as const;
