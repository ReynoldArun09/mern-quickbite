import { type Request, type Response } from "express";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import { signUpUserService } from "../services/authServices";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { signUpSchema } from "../validations/authSchema";

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
