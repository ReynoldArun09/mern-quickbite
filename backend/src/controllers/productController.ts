import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import {
  getAllProductsService,
  getRecentlyAddedProductService,
  getTopNonVegProductsService,
  getTopVegProductsService,
  searchProductsService,
} from "../services/productService";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { searchParamSchema } from "../validations/productSchema";

export const getAllProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { products } = await getAllProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

export const getTopVegProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { products } = await getTopVegProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

export const getTopNonVegProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { products } = await getTopNonVegProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

export const getRecentlyAddedProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { products } = await getRecentlyAddedProductService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});

export const searchProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { searchTerm } = request.params;

  const parsedSearchTerm = searchParamSchema.parse(searchTerm);

  const { products } = await searchProductsService(parsedSearchTerm);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});
