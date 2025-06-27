import { Router } from "express";
import * as auth from "../controllers/authController";
import { authMiddleware, authRateLimiter } from "../middlewares";
import { AUTH_ROUTES } from "./routeConstants";

const authRoutes = Router();

/** Public Routes */
authRoutes.post(AUTH_ROUTES.SIGN_UP, authRateLimiter, auth.signUpController);
authRoutes.post(AUTH_ROUTES.SIGN_IN, authRateLimiter, auth.signInController);
authRoutes.post(AUTH_ROUTES.FORGOT_PASSWORD, auth.forgotPasswordController);
authRoutes.post(AUTH_ROUTES.RESET_PASSWORD, auth.resetPasswordController);

/** Protected Routes */
authRoutes.post(AUTH_ROUTES.SIGN_OUT, authMiddleware, auth.signOutController);
authRoutes.get(AUTH_ROUTES.VERIFY_USER, authMiddleware, auth.verifyController);
authRoutes.post(AUTH_ROUTES.FORGOT_PASSWORD, auth.forgotPasswordController);

export default authRoutes;
