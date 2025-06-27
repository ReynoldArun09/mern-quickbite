import { v2 as cloudinary } from "cloudinary";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { productModel, userModel } from "../models";
import { ProductType, UserType } from "../types";
import { customError } from "../utils";
import { createProductSchemaType } from "../validations";

/**
 * Retrieves all users with the role 'user' (i.e., non-admin customers).
 *
 * @function getAllCustomersService
 * @async
 * @returns {Promise<Array>} A promise that resolves to an array of customer documents.
 */
export const getAllCustomersService = async (): Promise<UserType[]> => {
  const users = await userModel.find({ role: "user" });
  return users;
};

/**
 * Retrieves all products from the database for admin view.
 *
 * @function getAllProductsForAdminService
 * @async
 * @returns {Promise<Array>} A promise that resolves to an array of product documents.
 */
export const getAllProductsForAdminService = async (): Promise<ProductType[]> => {
  const products = await productModel.find({});
  return products;
};

/**
 * Deletes a customer by user ID after validating existence.
 *
 * @function deleteCustomerService
 * @async
 * @param {string} userId - The ID of the user to delete.
 * @throws {customError} If the user is not found.
 * @returns {Promise<void>}
 */
export const deleteCustomerService = async (userId: string): Promise<void> => {
  const existingCustomer = await userModel.findById(userId);

  if (!existingCustomer) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  await userModel.findByIdAndDelete(userId);
};

/**
 * Deletes a product by product ID after validating existence.
 *
 * @function deleteProductService
 * @async
 * @param {string} productId - The ID of the product to delete.
 * @throws {customError} If the product is not found.
 * @returns {Promise<void>}
 */
export const deleteProductService = async (productId: string): Promise<void> => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  if (existingProduct.image) {
    const imageId = existingProduct.image.split("/").pop()?.split(".")[0] as string;
    await cloudinary.uploader.destroy(imageId);
  }

  await productModel.findByIdAndDelete(productId);
};

/**
 * Toggles the blocked status of a user (block/unblock).
 *
 * @function blockUnBlockUserService
 * @async
 * @param {string} userId - The ID of the user to block or unblock.
 * @throws {customError} If the user is not found.
 * @returns {Promise<{ status: boolean }>} The updated blocked status.
 */
export const blockUnBlockUserService = async (userId: string): Promise<{ status: boolean }> => {
  const existingCustomer = await userModel.findById(userId);

  if (!existingCustomer) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  if (existingCustomer.blocked) {
    await userModel.findByIdAndUpdate(userId, {
      blocked: false,
    });
    return { status: false };
  } else {
    await userModel.findByIdAndUpdate(userId, {
      blocked: true,
    });
    return { status: true };
  }
};

/**
 * Toggles the availability status of a product (enable/disable).
 *
 * @function enableDisableProductService
 * @async
 * @param {string} productId - The ID of the product to toggle availability.
 * @throws {customError} If the product is not found.
 * @returns {Promise<{ status: boolean }>} The updated availability status.
 */
export const enableDisableProductService = async (productId: string): Promise<{ status: boolean }> => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  if (existingProduct.available === true) {
    await productModel.findByIdAndUpdate(productId, {
      available: false,
    });
    return { status: false };
  } else {
    await productModel.findByIdAndUpdate(productId, {
      available: true,
    });
    return { status: true };
  }
};

export const createProductService = async (body: createProductSchemaType, imageUrl: string) => {
  const { name, description, price, category, discount, ingredients, starRating, originalPrice } = body;

  const existingProduct = await productModel.find({ name });

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const newFood = new productModel({
    name,
    description,
    price,
    category,
    originalPrice,
    discount,
    ingredients,
    starRating,
    image: imageUrl,
  });

  await newFood.save();
};
