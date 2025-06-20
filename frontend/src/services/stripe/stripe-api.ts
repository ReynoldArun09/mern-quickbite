import { axiosInstance } from "../axios";

export const handlePaymentApi = async ({ products }: any) => {
  const response = await axiosInstance.post("/payment/create-checkout-session", products);
  return response.data;
};
