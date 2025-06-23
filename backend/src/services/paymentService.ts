import { Types } from "mongoose";
import { cartModel } from "../models";

/**
 * Clears a user's cart from the database after successful payment.
 *
 * @function clearCartAfterPaymentService
 * @async
 * @param {string} userId - The ID of the user whose cart should be cleared.
 * @returns {Promise<{ deletedCount?: number }>} Result of the delete operation.
 */
export const clearCartAfterPaymentService = async (userId: Types.ObjectId): Promise<{ deletedCount?: number }> => {
  return await cartModel.deleteOne({ orderBy: userId });
};
