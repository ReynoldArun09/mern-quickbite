export const ADMIN_ENDPOINTS = {
  GET_PRODUCTS_ADMIN: "admin/get-products",
  GET_CUSTOMERS: "admin/get-customers",
  DLETE_PRODUCT: (productId: string) => `admin/delete/${productId}`,
  DELETE_CUSTOMER: (userId: string) => `admin/user-delete/${userId}`,
  ENABLE_DISABLE_PRODUCT: (productId: string) => `admin/enable-disable/${productId}`,
  BLOCKANDUNBLOCK: (userId: string) => `admin/block-unblock-user/${userId}`,
} as const;

export const ADMIN_QUERY_KEYS = {
  ADMIN_PRODUCTS: ["q-admin-products"],
  ADMIN_CUSTOMERS: ["q-admin-customers"],
} as const;

export const ADMIN_MUTATION_KEYS = {
  DELETE_CUSTOMER: ["m-delete-customer"],
  DELETE_PRODUCT: ["m-delete-product"],
  BLOCK_UNBLOCK_CUSTOMER: ["m-block-unblock-customer"],
  ENABLE_DISABLE_PRODUCT: ["m-enable-disable-product"],
} as const;
