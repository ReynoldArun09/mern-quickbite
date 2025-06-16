import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import { getAllProductsService } from "../services/productService";
import { customAsyncWrapper, sendApiResponse } from "../utils";

export const getAllProducts = customAsyncWrapper(async (request: Request, response: Response) => {
  const { products } = await getAllProductsService();

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: products,
  });
});
