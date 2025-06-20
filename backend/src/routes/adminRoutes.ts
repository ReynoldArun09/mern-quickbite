import { Router } from "express";
import * as admin from "../controllers/adminController";
import { authMiddleware, isAdminMiddleware } from "../middlewares";
const adminRoutes = Router();

adminRoutes.get("/get-customers", authMiddleware, isAdminMiddleware, admin.getAllCustomers);
adminRoutes.get("/get-products", authMiddleware, isAdminMiddleware, admin.getAllProductsForAdmin);
adminRoutes.put("/enable-disable/:productId", authMiddleware, isAdminMiddleware, admin.enableDisableProduct);
adminRoutes.delete("/delete/:productId", authMiddleware, isAdminMiddleware, admin.deleteProduct);
adminRoutes.delete("/user-delete/:userId", authMiddleware, isAdminMiddleware, admin.deleteCustomer);
adminRoutes.put("/block-unblock-user/:userId", authMiddleware, isAdminMiddleware, admin.blockUnBlockUser);

export default adminRoutes;
