import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { GlobalErrorMessages, HttpStatusCode } from "../constants";
import { customError } from "../utils";

export const validateUserIdParam = (request: Request, response: Response, next: NextFunction) => {
  const { userId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new customError(GlobalErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
  }

  next();
};
