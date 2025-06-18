import mongoose, { Document } from "mongoose";
import { CartModelType } from "../types";

type CartSchemaType = CartModelType & Document;

export const cartSchema = new mongoose.Schema<CartSchemaType>(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const cartModel = mongoose.model<CartSchemaType>("Cart", cartSchema);
