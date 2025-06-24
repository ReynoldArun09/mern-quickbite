import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpStatusCode } from "../constants";
import { customError } from "../utils";

export const ValidateObjectParamId =
  (paramName: string) => (request: Request, response: Response, next: NextFunction) => {
    const paramValue = request.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(paramValue)) {
      throw new customError(`${paramName} is not a valid MongoDB ObjectId`, HttpStatusCode.UNAUTHORIZED);
    }
    next();
  };
