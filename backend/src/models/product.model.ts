import mongoose from "mongoose";
import { ProductType } from "../types";

const productSchema = new mongoose.Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    starRating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    available: {
      type: Boolean,
      default: true,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    ingredients: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });

export const productModel = mongoose.model<ProductType>("Product", productSchema);
