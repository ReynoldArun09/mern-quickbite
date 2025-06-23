export const PRODUCT_END_POINTS = {
  GET_ALL: "product/all-products",
  GET_RECENT: "product/recently-added",
  GET_VEG: "product/veg-products",
  GET_NONVEG: "product/nonveg-products",
  SEARCH: (term: string) => `product/search/${term}`,
};

export const PRODUCT_QUERY_KEYS = {
  ALL_PRODUCTS: ["q-all-products"],
  RECENT_PRODUCTS: ["q-recent-products"],
  VEG_PRODUCTS: ["q-veg-products"],
  NONVEG_PRODUCTS: ["q-nonveg-products"],
  SEARCH_PRODUCTS: (term: string) => ["q-search-products", term],
} as const;
