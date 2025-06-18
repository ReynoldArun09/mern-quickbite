import { Types } from "mongoose";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { cartModel, productModel } from "../models";
import { customError } from "../utils";

/**
 * getCartItemsForUserService function to handle get cartitems from database.
 * - get cart items from database.
 */
export const getCartItemsForUserService = async (userId: Types.ObjectId) => {
  const cartItems = await cartModel.findOne({ orderBy: userId }).populate("products.product");
  return { cartItems };
};

/**
 * createUserCartService function to handle create new cart in database and add product.
 * - check if product exist in database.
 * - check if cart exist in database.
 * - if cart doesnt exist then new cart is created and product is added to it.
 * - if cart already exist. get product index using findIndex.
 * - update the count if product already exist or add item to the existing cart.
 *
 * @throws product not found in database.
 */
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

/**
 * removeFromCartService function to handle remove product from database.
 * - check if product exist in database.
 * - check if cart exist in database.
 * - get product index using findIndex and remove item using splice.
 *
 * @throws product not found in database if product doesnt exist and if also cart doesnt exist.
 */
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
