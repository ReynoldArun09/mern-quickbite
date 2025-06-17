import { axiosInstance } from "../axios";
import type { ProductType } from "../types";

export const getAllProductsApi = async () => {
  const response = await axiosInstance.get("product/all-products");
  return response.data;
};

export const getRecentlyAddedProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get("product/recently-added");
  return response.data.data;
};

export const getVegProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get("product/veg-products");
  return response.data.data;
};

export const getNonVegProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get("product/nonveg-products");
  return response.data.data;
};

export const searchProductsApi = async (searchTerm: string): Promise<ProductType[]> => {
  const response = await axiosInstance.get(`product/search/${searchTerm}`);
  return response.data.data;
};
