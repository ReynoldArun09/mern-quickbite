import { axiosInstance } from "../axios";
import type { CartPayload, CartResponse } from "../types";
import { CART_END_POINTS } from "./cart-constants";

export const getUserCartItemsApi = async (): Promise<CartResponse> => {
  const response = await axiosInstance.get(CART_END_POINTS.GET_USER_CART);
  return response.data.data;
};

export const addToCartApi = async (payload: CartPayload) => {
  const response = await axiosInstance.post(CART_END_POINTS.ADD_TO_CART, payload);
  return response.data.data;
};

export const removeFromCartApi = async (productId: string) => {
  const response = await axiosInstance.post(`${CART_END_POINTS.REMOVE_FROM_CART}/${productId}`);
  return response.data.data;
};

export const updateProductCountApi = async (payload: CartPayload) => {
  const response = await axiosInstance.put(CART_END_POINTS.UPDATED_CART, payload);
  return response.data.data;
};
