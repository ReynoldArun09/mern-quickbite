import { axiosInstance } from "../axios";
import type { ProductType, UserType } from "../types";

export const getAllProductsForAdminApi = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get("admin/get-products");
  return response.data.data;
};

export const getAllCustomersApi = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get("admin/get-customers");
  return response.data.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await axiosInstance.delete(`admin/delete/${productId}`);
  return response.data.data;
};

export const deleteCustomer = async (userId: string) => {
  const response = await axiosInstance.delete(`admin/user-delete/${userId}`);
  return response.data.data;
};

export const enableDisableProduct = async (productId: string) => {
  const response = await axiosInstance.put(`admin/enable-disable/${productId}`);
  return response.data.data;
};

export const blockUnblockCustomer = async (userId: string) => {
  const response = await axiosInstance.put(`admin/block-unblock-user/${userId}`);
  return response.data.data;
};
