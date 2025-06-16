import { type Response } from "express";
import { HttpStatusCode } from "../constants";

interface IApiResponse<T> {
  response: Response;
  statusCode: HttpStatusCode;
  success?: boolean;
  message?: string;
  data?: T;
}

export const sendApiResponse = <T>({ response, statusCode, success = true, message, data }: IApiResponse<T>) => {
  return response.status(statusCode).json({
    success,
    message,
    data,
  });
};
