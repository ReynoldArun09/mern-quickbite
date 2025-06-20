import { type Request, type Response } from "express";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import {
  blockUnBlockUserService,
  deleteCustomerService,
  deleteProductService,
  enableDisableProductService,
  getAllCustomersService,
  getAllProductsForAdminService,
} from "../services/adminServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";

export const getAllCustomers = customAsyncWrapper(async (request: Request, response: Response) => {
  const users = await getAllCustomersService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: users,
  });
});

export const getAllProductsForAdmin = customAsyncWrapper(async (request: Request, response: Response) => {
  const products = await getAllProductsForAdminService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

export const deleteCustomer = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.params.userId;
  await deleteCustomerService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.USER_DELETED,
  });
});

export const deleteProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const productId = request.params.productId;
  await deleteProductService(productId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.PRODUCT_DELETED,
  });
});

export const enableDisableProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const productId = request.params.productId;
  const { status } = await enableDisableProductService(productId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: status ? ApiSuccessMessages.PRODUCT_ENABLED : ApiSuccessMessages.PRODUCT_DISABLED,
  });
});

export const blockUnBlockUser = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.params.userId;
  const { status } = await blockUnBlockUserService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: status ? ApiSuccessMessages.USER_BLOCKED : ApiSuccessMessages.USER_UNBLOCKED,
  });
});
