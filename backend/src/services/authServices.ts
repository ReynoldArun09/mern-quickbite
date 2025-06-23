import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { userModel } from "../models";
import { type UserType } from "../types";
import { customError } from "../utils";
import { signInSchemaType, signUpSchemaType } from "../validations";

/**
 * Service to signup a new user.
 *
 * - Checks if a user with the provided email already exists.
 * - If not, hashes the password using bcrypt and creates a new user in database.
 *
 * @function signUpService
 * @async
 * @param {signUpSchemaType} body - Object containing user signup details.
 * @throws {customError} If a user with the same email already exists.
 */
export const signUpService = async (body: signUpSchemaType) => {
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

/**
 * Service to authenticate a user and generate a JWT token.
 * - Check's if user already exists.
 * - compare the provided password with the stored password.
 *
 * @function signInService
 * @async
 * @throws {customError} If the user does not exist.
 * @returns {Promise<{user:Object, token:string}>} authenticated user details and a JWT token.
 */
export const signInService = async ({
  email,
  password,
  rememberMe,
}: signInSchemaType): Promise<{ user: Omit<UserType, "password">; token: string }> => {
  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const comparePassword = await bcrypt.compare(password, existingUser.password);

  if (!comparePassword) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const userData = {
    _id: existingUser._id,
    firstname: existingUser.firstname,
    lastname: existingUser.lastname,
    email: existingUser.email,
    mobile: existingUser.mobile,
    role: existingUser.role,
    blocked: existingUser.blocked,
  };

  const token = await jwt.sign({ _id: existingUser._id }, ParsedEnvVariables.ACCESS_TOKEN_SECRET, {
    expiresIn: rememberMe ? "30d" : "1d",
  });

  return { user: userData, token };
};
