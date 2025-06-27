import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      ctx: UserContextType;
    }
  }
}

export enum userRole {
  ADMIN = "admin",
  USER = "user",
}

export type UserType = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  mobile: string;
  role: userRole;
  blocked: boolean;
  resetPasswordToken?: string | null;
  resetPasswordExpiresAt?: Date | null;
};

export type UserContextType = Omit<UserType, "password"> & {
  _id: Types.ObjectId;
};

export type ProductType = {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  starRating: number;
  available: boolean;
  vegetarian: boolean;
  discount: number;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartProduct = {
  product: Types.ObjectId;
  count: number;
  price: number;
};

export type CartType = {
  products: CartProduct[];
  cartTotal: number;
  orderBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
