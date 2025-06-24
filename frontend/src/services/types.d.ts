export type UserType = {
  email: string;
  _id: string;
  firstname: string;
  lastname: string;
  mobile: string;
  blocked?: boolean;
  role?: string;
};

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  starRating: number;
  available: boolean;
  vegetarian: boolean;
  discount: number;
  ingredients: string[];
  originalPrice: number;
};

export type CartResponse = {
  _id: string;
  cartTotal: number;
  orderBy: string;
  products: CartProduct[];
};

export type CartProduct = {
  product: ProductType;
  count: number;
  price: number;
};

export type CartPayload = {
  count: number;
  productId: string;
};

/** auth response types */
export type userData = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  role: "user" | "admin";
  blocked: boolean;
};

export type signInApiResponse = {
  success: string;
  message: string;
  data: userData;
};

export type verifyResponseType = userData;

export type signOutApiResponse = Omit<signInApiResponse, "data">;
export type signUpApiResponse = Omit<signInApiResponse, "data">;

/** product response types */

export type AdminProductsResponse = ProductType[];
export type AdminCustomerResponse = UserType[];
