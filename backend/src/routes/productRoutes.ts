import { Router } from "express";
import * as product from "../controllers/productController";
import { PRODUCT_ROUTES } from "./routeConstants";

const productRoutes = Router();

productRoutes.get(PRODUCT_ROUTES.ALL_PRODUCTS, product.getAllProducts);
productRoutes.get(PRODUCT_ROUTES.VEG_PRODUCTS, product.getTopVegProducts);
productRoutes.get(PRODUCT_ROUTES.NONVEG_PRODUCTS, product.getTopNonVegProducts);
productRoutes.get(PRODUCT_ROUTES.RECENTLY_ADDED, product.getRecentlyAddedProducts);
productRoutes.get(PRODUCT_ROUTES.SEARCH, product.searchProducts);

export default productRoutes;
