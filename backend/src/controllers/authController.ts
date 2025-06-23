import type { Request, Response } from "express";
import { ParsedEnvVariables } from "../configs";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import { signInService, signUpService } from "../services/authServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { signInSchema, signUpSchema } from "../validations";

/**
 * Handles the request to signup user.
 *
 * Validates request body using zod `signUpSchema` and calls `signUpService` to create user account.
 *
 * @function signUpController
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with message and HTTP 201 status.
 *
 * @throws {ZodError} If the request body validation fails.
 */
export const signUpController = customAsyncWrapper(async (request: Request, response: Response) => {
  const body = signUpSchema.parse(request.body);

  await signUpService(body);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.SIGN_UP_SUCCESS,
  });
});

/**
 * Handles the request to signin user.
 *
 * Validates request body using zod `signInSchema` and calls `signInService` to allow user to access account.
 *
 * @function signInController
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with user data, message, and attach HTTP cookie with 200 status.
 */
export const signInController = customAsyncWrapper(async (request: Request, response: Response) => {
  const { email, password, rememberMe } = signInSchema.parse(request.body);

  const { user, token } = await signInService({ email, password, rememberMe });

  const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  response.cookie("accessToken", token, {
    httpOnly: true,
    secure: ParsedEnvVariables.NODE_ENV === "production",
    sameSite: ParsedEnvVariables.NODE_ENV === "production" ? "none" : "strict",
    maxAge: cookieMaxAge,
  });

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_IN_SUCCESS,
    data: user,
  });
});

/**
 * Handles the request to signout user.
 *
 * clear's cookie.
 *
 * @function signOutController
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with message and HTTP 200 status.
 */
export const signOutController = customAsyncWrapper(async (req: Request, response: Response) => {
  response.clearCookie("accessToken");

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_OUT_SUCCESS,
  });
});

/**
 * Handles the request to verify user.
 *
 * Receive's user data from context attached from auth middleware.
 *
 * @function verifyController
 * @async
 * @param {Request} request - Express request object.
 * @param {Response} response - Express response object.
 * @returns Sends a response with user data and HTTP 200 status.
 */
export const verifyController = customAsyncWrapper(async (request: Request, response: Response) => {
  const user = request.ctx;

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: user,
  });
});
