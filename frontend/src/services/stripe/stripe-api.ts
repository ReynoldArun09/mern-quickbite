import { axiosInstance } from "../axios";
import type { ProductType } from "../types";

type PaymentPayload = {
  count: number;
  price: number;
  product: ProductType;
};

export const handlePaymentApi = async (cartItems: PaymentPayload[]) => {
  const response = await axiosInstance.post("/payment/create-checkout-session", { cartItems });
  return response.data;
};

export const clearCartAfterPaymentApi = async () => {
  const response = await axiosInstance.post("/payment/clear-cart");
  return response.data;
};
