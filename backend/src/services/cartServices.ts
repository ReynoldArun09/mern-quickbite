import { Types } from "mongoose";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { cartModel, productModel } from "../models";
import { customError } from "../utils";

/**
 * Retrieves cart items for a specific user.
 *
 * @function getCartItemsForUserService
 * @async
 * @param {Types.ObjectId} userId - MongoDB ObjectId of the user.
 * @returns {Promise<{ cartItems: any }>} The user's cart populated with product details.
 */
export const getCartItemsForUserService = async (userId: Types.ObjectId): Promise<{ cartItems: any }> => {
  const cartItems = await cartModel.findOne({ orderBy: userId }).populate("products.product");
  return { cartItems };
};

/**
 * Creates or updates a user's cart with a product and quantity.
 *
 * @function createUserCartservice
 * @async
 * @param {string} productId - The ID of the product to add.
 * @param {number} count - Quantity of the product.
 * @param {Types.ObjectId} userId - MongoDB ObjectId of the user.
 * @throws {customError} If product does not exist.
 * @returns {Promise<{ existingCart: any }>} The updated or newly created cart.
 */
export const createUserCartservice = async (
  productId: string,
  count: number,
  userId: Types.ObjectId
): Promise<{ existingCart: any }> => {
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

  const productIndex = existingCart?.products?.findIndex((item) => item.product.toString() === productId.toString());

  if (productIndex > -1) {
    existingCart.products[productIndex].count += count;
  } else {
    existingCart.products.push({
      product: productId as unknown as Types.ObjectId,
      count,
      price: existingProduct.price,
    });
  }

  existingCart.cartTotal = existingCart.products.reduce((total, item) => total + item.count * item.price, 0);

  await existingCart.save();

  return { existingCart };
};

/**
 * Removes a product from a user's cart.
 *
 * @function removeFromCartService
 * @async
 * @param {string} productId - The ID of the product to remove.
 * @param {Types.ObjectId} userId - MongoDB ObjectId of the user.
 * @throws {customError} If product or cart is not found.
 * @returns {Promise<void>}
 */
export const removeFromCartService = async (productId: string, userId: Types.ObjectId): Promise<void> => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  let existingCart = await cartModel.findOne({ orderBy: userId });

  if (!existingCart) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const productIndex = existingCart.products.findIndex((item) => item.product.toString() === productId.toString());

  if (productIndex !== -1) {
    const existingCartItem = existingCart.products[productIndex];
    const productCount = existingCartItem.count || 1;
    existingCart.products.splice(productIndex, 1);
    existingCart.cartTotal -= existingProduct.price * productCount;

    if (existingCart.cartTotal < 0) {
      existingCart.cartTotal = 0;
    }

    await existingCart.save();
  }
};

/**
 * Updates the quantity of a product in the cart, or removes it if count is 0.
 *
 * @function updateProductCountService
 * @async
 * @param {string} productId - The ID of the product to update.
 * @param {number} count - New quantity for the product.
 * @param {Types.ObjectId} userId - MongoDB ObjectId of the user.
 * @throws {customError} If product or cart is not found.
 * @returns {Promise<{ existingCart: any }>} The updated cart object.
 */
export const updateProductCountService = async (
  productId: string,
  count: number,
  userId: Types.ObjectId
): Promise<{ existingCart: any }> => {
  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  let existingCart = await cartModel.findOne({ orderBy: userId });

  if (!existingCart) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const productIndex = existingCart.products.findIndex((item) => item.product.toString() === productId.toString());

  if (productIndex === -1) {
    throw new customError(ApiErrorMessages.PRODUCT_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const existingCartItem = existingCart.products[productIndex];
  const oldCount = existingCartItem.count;

  if (count === 0) {
    existingCart.products.splice(productIndex, 1);
    existingCart.cartTotal -= existingProduct.price * oldCount;
  } else {
    existingCart.products[productIndex].count = count;
    existingCart.cartTotal -= existingProduct.price * oldCount;
    existingCart.cartTotal += existingProduct.price * count;
  }

  await existingCart.save();
  await existingCart.populate("products.product");

  return { existingCart };
};
