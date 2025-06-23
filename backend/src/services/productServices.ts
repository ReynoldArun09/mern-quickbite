import { productModel } from "../models";
import { ProductType } from "../types";

/**
 * Retrieves all products from the database.
 *
 * @function getAllProductsService
 * @async
 * @returns {Promise<ProductType[]>} A promise that resolves with all products.
 *
 */
export const getAllProductsService = async (): Promise<ProductType[]> => {
  const products = await productModel.find({});
  return products;
};

/**
 * Retrieves top 8 vegetarian products from database.
 *
 * Filter by `vegetarian: true` and limits result to 8.
 *
 * @function getTopVegProductsService
 * @async
 * @returns {Promise<ProductType[]>} A promise that resolves with vegetarian products.
 *
 */
export const getTopVegProductsService = async (): Promise<ProductType[]> => {
  const products = await productModel.find({ vegetarian: true }).limit(8);
  return products;
};

/**
 * Retrieves top 8 non-vegetarian products from database.
 *
 * Filter by `vegetarian: false` and limits result to 8.
 *
 * @function getTopNonVegProductsService
 * @async
 * @returns {Promise<ProductType[]>} A promise that resolves with non-vegetarian products.
 *
 */
export const getTopNonVegProductsService = async (): Promise<ProductType[]> => {
  const products = await productModel.find({ vegetarian: false }).limit(8);
  return products;
};

/**
 * Retrieves top 8 recently added products from database.
 *
 * Filter by `getRecentlyAddedProductService` and limits result to 8.*
 *
 * @function getRecentlyAddedProductService
 * @async
 * @returns {Promise<ProductType[]>} A promise that resolves with recently added products.
 *
 */
export const getRecentlyAddedProductService = async (): Promise<ProductType[]> => {
  const products = await productModel.find({}).sort({ created: -1 }).limit(8);
  return products;
};

/**
 * Searches for products based on a case-insensitive partial match of the product name.
 *
 * Uses a regex query for flexible name matching and limits results to 20.
 *
 * @function searchProductsService
 * @async
 * @param {string} searchTerm - The search term to match against product names.
 * @returns {Promise<ProductType[]>} A promise that resolves with recently added products.
 *
 */
export const searchProductsService = async (searchTerm: string): Promise<ProductType[]> => {
  const products = await productModel.find({ $text: { $search: searchTerm } }).limit(20);
  return products;
};
