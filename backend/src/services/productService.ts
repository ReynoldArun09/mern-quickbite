import { productModel } from "../models";
import { escapeRegex } from "../utils/helper";

export const getAllProductsService = async () => {
  const products = await productModel.find({});
  return { products };
};

export const getTopVegProductsService = async () => {
  const products = await productModel.find({ vegetarian: true }).limit(8);
  return { products };
};

export const getTopNonVegProductsService = async () => {
  const products = await productModel.find({ vegetarian: false }).limit(8);
  return { products };
};

export const getRecentlyAddedProductService = async () => {
  const products = await productModel.find({ createdAt: -1 });
  return { products };
};

export const searchProductsService = async (searchTerm: string) => {
  const searchRegex = new RegExp(escapeRegex(searchTerm), "i");
  const products = await productModel.find({ name: { $regex: searchRegex } }).limit(20);
  return { products };
};
