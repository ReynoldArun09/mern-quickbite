import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      ctx: UserContextType;
    }
  }
}

export type UserContextType = Omit<UserType, "password"> & {
  _id: mongoose.Types.ObjectId;
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
