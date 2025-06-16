import { type Request, type Response } from "express";
import { ParsedEnvVariables } from "../configs";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import { signInUserService, signUpUserService } from "../services/authServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { signInSchema, signUpSchema } from "../validations/authSchema";

/**
 * signUpUserController function to handle signup user request.
 * - validates request body using zod.
 * - invokes signUpUserService.
 * - creates a user and return success message with 201 status code.
 *
 * @param - The request object containing user data for signup.
 * @param - The response object used to send API response.
 *
 * @returns A Success message with 201 status code. when user is signup is successful
 */
export const signUpUserController = customAsyncWrapper(async (request: Request, response: Response) => {
  const body = signUpSchema.parse(request.body);

  await signUpUserService(body);

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.SIGN_UP_SUCCESS,
  });
});

/**
 * signInUserController function to handle user signin request.
 * - validates request body using zod.
 * - invokes signInUserService.
 * - creates cookie and attach to http request.
 *
 * @param The request object containing user signin details.
 * @param The response object used to send Api response and attach cookie.
 *
 * @returns A Success message with 200 status code. when user is signed in
 * and returns user data to client with cookie.
 */
export const signInUserController = customAsyncWrapper(async (req: Request, response: Response) => {
  const body = signInSchema.parse(req.body);

  const { user, token } = await signInUserService(body);

  response.cookie("accessToken", token, {
    httpOnly: true,
    secure: ParsedEnvVariables.NODE_ENV === "production",
    sameSite: ParsedEnvVariables.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_IN_SUCCESS,
    data: user,
  });
});

/**
 * signOutUserController function to handle user signout request.
 * - clear cookie
 *
 * @returns A success message response indicating user has been signed out.
 */
export const signOutUserController = customAsyncWrapper(async (req: Request, response: Response) => {
  response.clearCookie("accessToken");

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_OUT_SUCCESS,
  });
});

/**
 * verifyUserController function to handle user verification request.
 * This function retrieves authenticated user from the request context
 * and return the user data as response.
 *
 * @param req - The request object which contains the authenticated user data in its context.
 * @param res - The response object which is used to send API response.
 * @returns A Success response containing the authenticated user data
 */
export const verifyUserController = customAsyncWrapper(async (request: Request, response: Response) => {
  const user = request.ctx;

  sendApiResponse({
    response,
    statusCode: HttpStatusCode.OK,
    data: user,
  });
});
