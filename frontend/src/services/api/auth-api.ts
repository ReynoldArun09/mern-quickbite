import type { signInSchemaType, signUpSchemaType } from "@/validations/auth-schema";
import { axiosInstance } from "../axios";
import type { GeneralResponseType, siginResponse, VerifyResponseType } from "../types";

export const signUpApi = async (values: signUpSchemaType): Promise<GeneralResponseType> => {
  const response = await axiosInstance.post("auth/signup", values);
  return response.data;
};

export const signInApi = async (values: signInSchemaType): Promise<siginResponse> => {
  const response = await axiosInstance.post("auth/signin", values);
  return response.data;
};

export const verifyApi = async (): Promise<VerifyResponseType> => {
  const response = await axiosInstance.get("auth/verify");
  return response.data;
};

export const signOutApi = async (): Promise<GeneralResponseType> => {
  const response = await axiosInstance.post("auth/signout");
  return response.data;
};
