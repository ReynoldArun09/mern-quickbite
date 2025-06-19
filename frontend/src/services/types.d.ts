export type GeneralResponseType = {
  message: string;
  success: boolean;
};

export type siginResponse = {
  data: UserType;
} & GeneralResponseType;

export type VerifyResponseType = {
  data: UserType;
} & Omit<GeneralResponseType, "message">;

export type UserType = {
  email: string;
  _id: string;
  fristname: string;
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
