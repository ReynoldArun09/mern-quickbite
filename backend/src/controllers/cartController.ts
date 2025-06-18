import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import { createUserCartservice, getCartItemsForUserService, removeFromCartService } from "../services/cartServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";

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

export const createUserCart = customAsyncWrapper(async (request: Request, response: Response) => {
  const ctx = request.ctx;
  const userId = ctx._id;
  const { productId, count } = request.body;
  await createUserCartservice(productId, count, userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});

export const removeFromCart = customAsyncWrapper(async (request: Request, response: Response) => {
  const ctx = request.ctx;
  const userId = ctx._id;
  const productId = request.params;
  await removeFromCartService(String(productId), userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});
