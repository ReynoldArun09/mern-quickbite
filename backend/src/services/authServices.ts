import bcrypt from "bcryptjs";
import { ParsedEnvVariables } from "../configs";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { userModel } from "../models";
import { customError } from "../utils";
import { signUpSchemaType } from "../validations/authSchema";

/**
 * signUpUserService function to handle creating a user in database.
 * - check if user already exist in database.
 * - hash password using bcrypt.
 * - create user in mongodb database.
 *
 * @throws user already exists error message with 400 status code.
 */
export const signUpUserService = async (body: signUpSchemaType) => {
  const { email, password, firstname, lastname, mobile } = body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new customError(ApiErrorMessages.USER_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
  }
  const salt = parseInt(ParsedEnvVariables.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  await userModel.create({
    email,
    firstname,
    lastname,
    password: hashedPassword,
    mobile: parseInt(mobile),
  });
};
