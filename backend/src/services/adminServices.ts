import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { productModel, userModel } from "../models";
import { customError } from "../utils";

export const getAllCustomersService = async () => {
  const users = await userModel.find({ role: "user" });
  return users;
};

export const getAllProductsForAdminService = async () => {
  const products = await productModel.find({});
  return products;
};

export const deleteCustomerService = async (userId: string) => {
  const existingCustomer = await userModel.findById(userId);

  if (!existingCustomer) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  await userModel.findByIdAndDelete(userId);
};

export const deleteProductService = async (productId: string) => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  // todo delete from cloudinary

  await productModel.findByIdAndDelete(productId);
};

export const blockUnBlockUserService = async (userId: string) => {
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

export const enableDisableProductService = async (productId: string) => {
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
