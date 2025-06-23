import { Router } from "express";
import * as payment from "../controllers/paymentController";
import { authMiddleware } from "../middlewares";
import { PAYMENT_ROUTES } from "./routeConstants";

const paymentRoutes = Router();

paymentRoutes.post(PAYMENT_ROUTES.CREATE_CHECKOUT_SESSION, authMiddleware, payment.createCheckoutSessionApi);
paymentRoutes.post(PAYMENT_ROUTES.CLEAR_CART, authMiddleware, payment.clearCartAfterPayment);

export default paymentRoutes;
