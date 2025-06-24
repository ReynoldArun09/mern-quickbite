import { Router } from "express";
import * as admin from "../controllers/adminController";
import { authMiddleware, isAdminMiddleware, ValidateObjectParamId } from "../middlewares";
import { ADMIN_ROUTES } from "./routeConstants";

const adminRoutes = Router();

adminRoutes.get(ADMIN_ROUTES.GET_CUSTOMERS, authMiddleware, isAdminMiddleware, admin.getAllCustomers);
adminRoutes.get(ADMIN_ROUTES.GET_PRODUCTS, authMiddleware, isAdminMiddleware, admin.getAllProductsForAdmin);
adminRoutes.put(
  ADMIN_ROUTES.ENABLE_DISABLE_PRODUCT,
  ValidateObjectParamId("productId"),
  authMiddleware,
  isAdminMiddleware,
  admin.enableDisableProduct
);
adminRoutes.delete(
  ADMIN_ROUTES.DELETE_PRODUCT,
  ValidateObjectParamId("productId"),
  authMiddleware,
  isAdminMiddleware,
  admin.deleteProduct
);
adminRoutes.delete(
  ADMIN_ROUTES.DELETE_CUSTOMER,
  ValidateObjectParamId("userId"),
  authMiddleware,
  isAdminMiddleware,
  admin.deleteCustomer
);
adminRoutes.put(
  ADMIN_ROUTES.BLOCK_UNBLOCK_USER,
  ValidateObjectParamId("userId"),
  authMiddleware,
  isAdminMiddleware,
  admin.blockUnBlockUser
);

export default adminRoutes;
