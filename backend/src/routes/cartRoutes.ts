import { Router } from "express";
import * as cart from "../controllers/cartController";
import { authMiddleware, validateUserIdParam } from "../middlewares";
import { CART_ROUTES } from "./routeConstants";

const cartRoutes = Router();

cartRoutes.post(CART_ROUTES.ADD_TO_CART, authMiddleware, cart.createUserCart);
cartRoutes.get(CART_ROUTES.GET_CART, authMiddleware, cart.getCartItemsForUser);
cartRoutes.post(CART_ROUTES.REMOVE_FROM_CART, validateUserIdParam, authMiddleware, cart.removeFromCart);
cartRoutes.put(CART_ROUTES.UPDATE_CART, authMiddleware, cart.updateProductCount);

export default cartRoutes;
