import { Router } from "express";
import * as auth from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/signup", auth.signUpUserController);
authRoutes.post("/signin", auth.signInUserController);

export default authRoutes;
