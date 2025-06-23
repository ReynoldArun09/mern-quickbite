import { Router } from "express";
import * as auth from "../controllers/authController";
import { authMiddleware, authRateLimiter } from "../middlewares";
import { AUTH_ROUTES } from "./routeConstants";

const authRoutes = Router();

/** Public Routes */
authRoutes.post(AUTH_ROUTES.SIGN_UP, authRateLimiter, auth.signUpController);
authRoutes.post(AUTH_ROUTES.SIGN_IN, authRateLimiter, auth.signInController);

/** Protected Routes */
authRoutes.post(AUTH_ROUTES.SIGN_OUT, authMiddleware, auth.signOutController);
authRoutes.get(AUTH_ROUTES.VERIFY_USER, authMiddleware, auth.verifyController);

export default authRoutes;
