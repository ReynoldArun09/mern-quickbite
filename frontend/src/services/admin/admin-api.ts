import { axiosInstance } from "../axios";
import type { AdminCustomerResponse, AdminProductsResponse } from "../types";
import { ADMIN_ENDPOINTS } from "./admin-constants";

export const getAllProductsForAdminApi = async (): Promise<AdminProductsResponse> => {
  const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_PRODUCTS_ADMIN);
  return response.data.data;
};

export const getAllCustomersApi = async (): Promise<AdminCustomerResponse> => {
  const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_CUSTOMERS);
  return response.data.data;
};

export const deleteProductApi = async (productId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosInstance.delete(ADMIN_ENDPOINTS.DLETE_PRODUCT(productId));
  return response.data;
};

export const deleteCustomerApi = async (userId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosInstance.delete(ADMIN_ENDPOINTS.DELETE_CUSTOMER(userId));
  return response.data;
};

export const enableDisableProductApi = async (productId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosInstance.put(ADMIN_ENDPOINTS.ENABLE_DISABLE_PRODUCT(productId));
  return response.data;
};

export const blockUnblockCustomerApi = async (userId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosInstance.put(ADMIN_ENDPOINTS.BLOCKANDUNBLOCK(userId));
  return response.data;
};
