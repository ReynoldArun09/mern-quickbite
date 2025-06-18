import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import { createUserCartservice, getCartItemsForUserService, removeFromCartService } from "../services/cartServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { cartSchema } from "../validations/cartSchema";

/**
 * getCartItemsForUser function to handle get cart items of user request.
 * - Retrieve userId from request context.
 * - invoke getCartItemsForUserService
 * - fetch's the array of cartitems of user from database and return's with 200 status code.
 *
 * @param The request object containing the userdata.
 * @param The response object used to send API response.
 *
 * @returns A success message and cartItems with status 200.
 */
export const getCartItemsForUser = customAsyncWrapper(async (request: Request, response: Response) => {
  const ctx = request.ctx;
  const userId = ctx._id;
  const { cartItems } = await getCartItemsForUserService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: cartItems,
  });
});

/**
 * createUserCart function to handle create user cart request.
 * - Retrieve userId from request context.
 * - receive's productId and count from request body.
 * - validates request body using zod.
 * - invoke's createUserService function.
 *
 * @param The request object containing the userdata, productId and count.
 * @param The response object used to send API response.
 *
 * @returns A Success message with 200 status code.
 */
export const createUserCart = customAsyncWrapper(async (request: Request, response: Response) => {
  const ctx = request.ctx;
  const userId = ctx._id;
  const { productId, count } = cartSchema.parse(request.body);
  await createUserCartservice(productId, count, userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});

/**
 * removeFromCart function to handle remove from cart request.
 * - Retrieve userId from request context.
 * - Retrieve productId from request params.
 * - validate productId if valid or not using zod.
 * - invoke removeFromCartService
 *
 * @param The request object containing the userdata and productId.
 * @param The response object used to send API response.
 *
 * @returns A Success message with 200 status code.
 */
export const removeFromCart = customAsyncWrapper(async (request: Request, response: Response) => {
  const ctx = request.ctx;
  const userId = ctx._id;
  const { productId } = request.params;
  await removeFromCartService(String(productId), userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});
