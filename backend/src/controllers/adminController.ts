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

/**
 * Handles the request to retrieve all customers.
 *
 * Calls the `getAllCustomerService` to fetch the list of customers,
 * excluding any admin users, and send success message with 200 status with the customer data.
 *
 * @function getAllCustomers
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends an API response containing an array of customers with status 200.
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
 * Handle the request to retrieve the products.
 *
 * Calls the `getAllProductsForAdminService` to fetch the products from database,
 * and send success message with 200 status with the products data.
 *
 * @function getAllProductsForAdmin
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Send an API response containng an array of products list with status 200.
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
 * Handle the request to delete a customer.
 *
 * Calls the `deleteCustomerService` with userId, find's the customer from database. if customer is not found
 * returns customer not found error. if customer exist delete the customer from database.
 *
 * @function deleteCustomer
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Send an API response with success message and status 200.
 */
export const deleteCustomer = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.params.userId;
  await deleteCustomerService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.USER_DELETED,
  });
});

/**
 * Handle the request to delete a product.
 *
 * Calls the `deleteProductService` with productId from params,
 * find's the prodcut from database. if product is not found
 * returns product not found error. if product exist delete the product from database.
 *
 * @function deleteProduct
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Send an API response with success message and status 200.
 */
export const deleteProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const productId = request.params.productId;
  await deleteProductService(productId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.PRODUCT_DELETED,
  });
});

/**
 * Handle the request to enable or disable a product.
 *
 * Calls the `enableDisableProductService` with productId from params,
 * find's the prodcut from database. if product is not found
 * returns product not found error. if product exist based on available property product
 * is disabled or enabled.
 *
 * @function deleteProduct
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Send an API response with success message and
 * api message product enabled or disabled status 200.
 */
export const enableDisableProduct = customAsyncWrapper(async (request: Request, response: Response) => {
  const productId = request.params.productId;
  const { status } = await enableDisableProductService(productId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: status ? ApiSuccessMessages.PRODUCT_ENABLED : ApiSuccessMessages.PRODUCT_DISABLED,
  });
});

/**
 * Handle the request to block or unblock a customer/user.
 *
 * Calls the `blockUnBlockUser` with userId from params,
 * find's the user from database. if user is not found
 * returns user not found error. if user exist based on blockd property used blocked
 * or unblocked.
 *
 * @function deleteProduct
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Send an API response with success message and status 200.
 */
export const blockUnBlockUser = customAsyncWrapper(async (request: Request, response: Response) => {
  const userId = request.params.userId;
  const { status } = await blockUnBlockUserService(userId);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: status ? ApiSuccessMessages.USER_BLOCKED : ApiSuccessMessages.USER_UNBLOCKED,
  });
});
