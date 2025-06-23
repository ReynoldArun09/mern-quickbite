import { axiosInstance } from "../axios";
import type { ProductType } from "../types";
import { PRODUCT_END_POINTS } from "./products-constants";

export const getAllProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get(PRODUCT_END_POINTS.GET_ALL);
  return response.data.data;
};

export const getRecentlyAddedProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get(PRODUCT_END_POINTS.GET_RECENT);
  return response.data.data;
};

export const getVegProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get(PRODUCT_END_POINTS.GET_VEG);
  return response.data.data;
};

export const getNonVegProductsApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get(PRODUCT_END_POINTS.GET_NONVEG);
  return response.data.data;
};

export const searchProductsApi = async (searchTerm: string): Promise<ProductType[]> => {
  const response = await axiosInstance.get(PRODUCT_END_POINTS.SEARCH(searchTerm));
  return response.data.data;
};
