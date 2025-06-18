import { Router } from "express";
import * as cart from "../controllers/cartController";
import { authMiddleware } from "../middlewares";
const cartRoutes = Router();

cartRoutes.post("/add-cart", authMiddleware, cart.createUserCart);
cartRoutes.get("/get-cart", authMiddleware, cart.getCartItemsForUser);
cartRoutes.get("/remove-product/:productId", authMiddleware, cart.removeFromCart);

export default cartRoutes;
