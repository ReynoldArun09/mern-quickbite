import { axiosInstance } from "../axios";
import type { CartPayload, CartResponse } from "../types";

export const getUserCartItemsApi = async (): Promise<CartResponse> => {
  const response = await axiosInstance.get("cart/get-cart");
  return response.data.data;
};

export const addToCartApi = async (payload: CartPayload) => {
  const response = await axiosInstance.post("cart/add-cart", payload);
  return response.data.data;
};

export const removeFromCartApi = async (productId: string) => {
  const response = await axiosInstance.post(`cart/remove-product/${productId}`);
  return response.data.data;
};

export const updateProductCountApi = async (payload: CartPayload) => {
  const response = await axiosInstance.put(`cart/update-cart`, payload);
  return response.data.data;
};
