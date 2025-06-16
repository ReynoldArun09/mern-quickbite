import { productModel } from "../models";

export const getAllProductsService = async () => {
  const products = await productModel.find({});
  return { products };
};
