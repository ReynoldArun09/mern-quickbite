import { Types } from "mongoose";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { cartModel, productModel } from "../models";
import { customError } from "../utils";

export const getCartItemsForUserService = async (userId: Types.ObjectId) => {
  const cartItems = await cartModel.find({ orderBy: userId }).populate("products.product");
  return { cartItems };
};

export const createUserCartservice = async (productId: string, count: number, userId: Types.ObjectId) => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  let existingCart = await cartModel.findOne({ orderBy: userId });

  if (!existingCart) {
    const cartTotal = existingProduct.price * count;
    existingCart = await cartModel.create({
      orderBy: userId,
      products: [
        {
          product: productId,
          count,
          price: existingProduct.price,
        },
      ],
      cartTotal,
    });

    return { existingCart };
  }

  existingCart.products || [];

  const productIndex = existingCart?.products?.findIndex((item) => item.product.toString() === productId);

  if (productIndex > -1) {
    existingCart.products[productIndex].count += count;
  } else {
    existingCart.products.push({
      product: productId,
      count,
      price: existingProduct.price,
    });
  }

  existingCart.cartTotal = existingCart.products.reduce((total, item) => total + item.count * productIndex, 0);

  await existingCart.save();

  return { existingCart };
};

export const removeFromCartService = async (productId: string, userId: Types.ObjectId) => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  let existingCart = await cartModel.findOne({ orderBy: userId });

  if (!existingCart) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const productIndex = existingCart.products.findIndex((item) => item.product.toString() === productId);

  if (productIndex !== -1) {
    existingCart.products.splice(productIndex, 1);
    existingCart.cartTotal -= existingProduct.price;
    await existingCart.save();
  }
};
