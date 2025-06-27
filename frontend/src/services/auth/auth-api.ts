import type { signInSchemaType, signUpSchemaType } from "@/validations/auth-schema";
import { axiosInstance } from "../axios";
import type { signInApiResponse, signOutApiResponse, signUpApiResponse, verifyResponseType } from "../types";
import { AUTH_ENDPOINTS } from "./auth-constants";

export const signUpApi = async (values: signUpSchemaType): Promise<signUpApiResponse> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGN_UP, values);
  return response.data;
};

export const signInApi = async (values: signInSchemaType): Promise<signInApiResponse> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGN_IN, values);
  return response.data;
};

export const verifyApi = async (): Promise<verifyResponseType | null> => {
  const response = await axiosInstance.get(AUTH_ENDPOINTS.VERIFY_USER);
  return response.data.data;
};

export const signOutApi = async (): Promise<signOutApiResponse> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGN_OUT);
  return response.data;
};

export const forgotPasswordApi = async (email: { email: string }) => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, email);
  return response.data;
};

export const resetPasswordApi = async (token: string, password: string) => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.UPDATE_PASSWORD(token), { password });
  return response.data;
};
