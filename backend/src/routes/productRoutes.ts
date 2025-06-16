import { Router } from "express";
import * as product from "../controllers/productController";

const productRoutes = Router();

productRoutes.get("/get-all-products", product.getAllProducts);

export default productRoutes;
