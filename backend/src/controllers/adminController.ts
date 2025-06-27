import { type Request, type Response } from "express";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import { uploadImage } from "../helpers";
import {
  blockUnBlockUserService,
  createProductService,
  deleteCustomerService,
  deleteProductService,
  enableDisableProductService,
  getAllCustomersService,
  getAllProductsForAdminService,
} from "../services/adminServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { createProductSchema } from "../validations";

/**
 * Handles the request to retrieve all customers except admin.
 *
 * Calls the `getAllCustomerService` to fetch the list of customers,
 *
 * @function getAllCustomers
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends an response with the list of users and HTTP 200 status.
 */
export const getAllCustomers = customAsyncWrapper(async (request: Request, response: Response) => {
  const users = await getAllCustomersService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: users,
  });
});

/**
 * Handle the request to retrieve all the available products.
 *
 * Calls the `getAllProductsForAdminService` to fetch the products.
 *
 *
 * @function getAllProductsForAdmin
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends an response with list of products and HTTP 200 status.
 */
export const getAllProductsForAdmin = customAsyncWrapper(async (request: Request, response: Response) => {
  const products = await getAllProductsForAdminService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

/**
 * Handle the request to delete a customer by user ID.
 *
 * Calls the `deleteCustomerService` to remove a customer from the database.
 *
 *
 * @function deleteCustomer
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends a success message and HTTP 200 status upon successful deletion.
 */
export const deleteCustomer = customAsyncWrapper(async (request: Request, response: Response) => {
  const { userId } = request.params;
  await deleteCustomerService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.USER_DELETED,
  });
});

/**
 * Handle the request to delete a product by product ID.
 *
 * Calls the `deleteProductService` to remove a product from the database.
 *
 * @function deleteProduct
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends a success message and HTTP 200 status upon successful deletion..
 */
export const deleteProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const { productId } = request.params;
  await deleteProductService(productId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.PRODUCT_DELETED,
  });
});

/**
 * Handle the request to enable or disable a product by product ID.
 *
 * Calls the `enableDisableProductService` to toggle the active status of the specified product.
 *
 * @function enableDisableProduct
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends a response with a status specific message and HTTP 200 status.
 */
export const enableDisableProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const { productId } = request.params;
  const { status } = await enableDisableProductService(productId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: status ? ApiSuccessMessages.PRODUCT_ENABLED : ApiSuccessMessages.PRODUCT_DISABLED,
  });
});

/**
 * Handle the request to block or unblock a customer/user by user ID.
 *
 * Calls the `blockUnBlockUserService` toggle the blocked status of the specified user

 *
 * @function blockUnBlockUser
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends a response with a status specific message and HTTP 200 status.
 */
export const blockUnBlockUser = customAsyncWrapper(async (request: Request, response: Response) => {
  const { userId } = request.params;
  const { status } = await blockUnBlockUserService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: status ? ApiSuccessMessages.USER_BLOCKED : ApiSuccessMessages.USER_UNBLOCKED,
  });
});

export const createProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const body = createProductSchema.parse(request.body);

  const imageUrl = await uploadImage(request.file as Express.Multer.File);

  await createProductService(body, imageUrl);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
  });
});
