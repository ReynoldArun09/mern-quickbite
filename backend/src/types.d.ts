declare global {
  namespace Express {
    interface Request {
      ctx: UserContextType;
    }
  }
}

export type UserContextType = Omit<UserType, "password"> & {
  _id: ObjectId;
};

export type UserType = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  mobile: string;
  role: string;
  blocked: boolean;
};

export type ProductType = {
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

export type CartProduct = {
  product: string;
  count: number;
  price: number;
};

export type CartModelType = {
  products: CartProduct[];
  cartTotal: number;
  orderBy: Types.ObjectIdj;
};
