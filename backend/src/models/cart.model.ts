import mongoose from "mongoose";
import { CartType } from "../types";

export const cartSchema = new mongoose.Schema<CartType>(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    cartTotal: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const cartModel = mongoose.model<CartType>("Cart", cartSchema);
