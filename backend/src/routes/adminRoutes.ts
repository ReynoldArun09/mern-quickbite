import { Router } from "express";
import * as admin from "../controllers/adminController";
const adminRoutes = Router();

adminRoutes.get("/get-customers", admin.getAllCustomers);
adminRoutes.get("/get-products", admin.getAllProductsForAdmin);
adminRoutes.put("/enable-disable/:productId", admin.enableDisableProduct);
adminRoutes.delete("/delete/:productId", admin.deleteProduct);
adminRoutes.delete("/user-delete/:userId", admin.deleteCustomer);
adminRoutes.put("/block-unblock-user/:userId", admin.blockUnBlockUser);

export default adminRoutes;
