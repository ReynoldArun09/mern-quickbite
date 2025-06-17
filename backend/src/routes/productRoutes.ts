import { Router } from "express";
import * as product from "../controllers/productController";

const productRoutes = Router();

productRoutes.get("/all-products", product.getAllProducts);
productRoutes.get("/veg-products", product.getTopVegProducts);
productRoutes.get("/nonveg-products", product.getTopNonVegProducts);
productRoutes.get("/recently-added", product.getRecentlyAddedProducts);
productRoutes.get("/search/:searchTerm", product.searchProducts);

export default productRoutes;
