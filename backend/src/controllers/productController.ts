import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import {
  getAllProductsService,
  getRecentlyAddedProductService,
  getTopNonVegProductsService,
  getTopVegProductsService,
  searchProductsService,
} from "../services/productServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { searchParamSchema } from "../validations";

/**
 * Handles the request to retrieve all the available products.
 *
 * Calls the `getAllProductsService` to fetch a complete list of products.
 *
 * @function getAllProducts
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 *
 * @returns Sends a response with the list of products and HTTP 200 status.
 */
export const getAllProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const products = await getAllProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

/**
 * Handles the request to retrieve top vegetarain products.
 *
 * Calls the `getTopVegProductsService` to get top vegetarain items.
 *
 * @function getTopVegProducts
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with vegetarian products with HTTP 200 status.
 */
export const getTopVegProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const products = await getTopVegProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

/**
 * Handles the request to retrieve top non-vegetarain products.
 *
 * Calls the `getTopNonVegProductsService` to get top non-vegetarain items.
 *
 * @function getTopNonVegProducts
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with non-vegetarian products with HTTP 200 status.
 */
export const getTopNonVegProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const products = await getTopNonVegProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

/**
 * Handles the request to retrieve recently added products.
 *
 * Calls the `getRecentlyAddedProductService` to get recently added items.
 *
 * @function getRecentlyAddedProducts
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with recently added products with HTTP 200 status.
 */
export const getRecentlyAddedProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const products = await getRecentlyAddedProductService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

/**
 * Handles the request to search products based on searchTerm.
 *
 * Validates the search term using Zod and calls `searchProductsService`.
 *
 * @function searchProducts
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with the matched products with HTTP 200 status.
 */
export const searchProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { searchTerm } = searchParamSchema.parse(request.params);

  const products = await searchProductsService(searchTerm);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});
