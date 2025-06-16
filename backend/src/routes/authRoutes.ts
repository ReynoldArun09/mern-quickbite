import { Router } from "express";
import * as auth from "../controllers/authController";
import { authMiddleware } from "../middlewares";

const authRoutes = Router();

authRoutes.post("/signup", auth.signUpUserController);
authRoutes.post("/signin", auth.signInUserController);
authRoutes.post("/signout", auth.signOutUserController);
authRoutes.get("/verify", authMiddleware, auth.verifyUserController);

export default authRoutes;
