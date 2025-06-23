import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import {
  createUserCartservice,
  getCartItemsForUserService,
  removeFromCartService,
  updateProductCountService,
} from "../services/cartServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { cartSchema } from "../validations";

/**
 * Handles the request to retrieve cart items of specific user ID.
 *
 * Calls the `getCartItemsForUserService` to get cart items of logged in user.
 *
 * @function getCartItemsForUser
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 *
 * @returns Send a response with list of cart items and HTTP 200 status.
 */
export const getCartItemsForUser = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.ctx._id;
  const { cartItems } = await getCartItemsForUserService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: cartItems,
  });
});

/**
 * Handles the request create a user cart.
 *
 * Validates with body data with zod and Calls `createUserCartservice` to create cart.
 *
 * @function getCartItemsForUser
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 *
 * @returns Send a response of HTTP 201 status.
 */
export const createUserCart = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.ctx._id;
  const { productId, count } = cartSchema.parse(request.body);
  await createUserCartservice(productId, count, userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.CREATED,
  });
});

/**
 * Handles the request to remove item from cart of logged in user.
 *
 * Calls `removeFromCartService` to remove specific product by product ID.
 *
 * @function removeFromCart
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 *
 * @returns Sends a response of 200 HTTP Status.
 */
export const removeFromCart = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.ctx._id;
  const { productId } = request.params;
  await removeFromCartService(productId, userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});

/**
 * Handles the request udpate product count in cart of logged in user.
 *
 * Calls `updateProductCountService` to update product count in cart.
 *
 * @function updateProductCount
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 *
 * @returns Send a response of HTTP 200 status.
 */
export const updateProductCount = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.ctx._id;
  const { productId, count } = cartSchema.parse(request.body);

  await updateProductCountService(productId, count, userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});
