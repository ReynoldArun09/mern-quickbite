import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { userModel } from "../models";
import { customError } from "../utils";
import { signInSchemaType, signUpSchemaType } from "../validations/authSchema";

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

/**
 * signInUserService function to handle checking if user exist in database.
 * - check if user exist in database.
 * - compare password using bcryptjs
 * - filter data to remove password field.
 * - generate token using jwt
 *
 * @throws user not found in database for both case user not found and password incorrect.
 * @returns userData and token
 */
export const signInUserService = async (body: signInSchemaType) => {
  const { email, password } = body;

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
  };

  const token = await jwt.sign({ _id: existingUser._id }, ParsedEnvVariables.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { user: userData, token };
};
