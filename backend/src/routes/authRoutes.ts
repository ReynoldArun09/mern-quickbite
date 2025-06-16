import { Router } from "express";
import * as auth from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/signup", auth.signUpUserController);

export default authRoutes;
