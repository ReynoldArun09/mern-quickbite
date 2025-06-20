import { Router } from "express";
import * as payment from "../controllers/paymentController";
import { authMiddleware } from "../middlewares";

const paymentRoutes = Router();

paymentRoutes.post("/create-checkout-session", authMiddleware, payment.createCheckoutSessionApi);
paymentRoutes.post("/clear-cart", authMiddleware, payment.clearCartAfterPayment);

export default paymentRoutes;
