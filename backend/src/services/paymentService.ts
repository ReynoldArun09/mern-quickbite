import { cartModel } from "../models";

export const clearCartAfterPaymentService = async (userId: string) => {
  return await cartModel.deleteOne({ orderBy: userId });
};
