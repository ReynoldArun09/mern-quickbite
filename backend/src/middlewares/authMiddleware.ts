import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { GlobalErrorMessages, HttpStatusCode } from "../constants";
import { userModel } from "../models";
import { UserContextType } from "../types";
import { customError } from "../utils";

export const authMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  const accessToken = request.cookies.accessToken;

  try {
    if (!accessToken) {
      return response.status(HttpStatusCode.UNAUTHORIZED).json({
        message: GlobalErrorMessages.UNAUTHORIZED,
      });
    }
    const decodedToken = jwt.verify(accessToken, ParsedEnvVariables.ACCESS_TOKEN_SECRET) as UserContextType;

    const existingUser = await userModel.findById(decodedToken._id);

    if (!existingUser) {
      throw new customError(GlobalErrorMessages.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED);
    }

    const userObject = {
      _id: existingUser._id,
      email: existingUser.email,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      role: existingUser.role,
      mobile: existingUser.mobile,
      blocked: existingUser.blocked,
    };

    request.ctx = userObject;
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdminMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const user = request.ctx;

  if (user.role !== "admin") {
    throw new customError(GlobalErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
  }
  next();
};
