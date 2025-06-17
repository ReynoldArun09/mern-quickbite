import type { signInSchemaType, signUpSchemaType } from "@/validations/auth-schema";
import { axiosInstance } from "../axios";
import type { siginResponse, signupResponse } from "../types";

export const signUpApi = async (values: signUpSchemaType): Promise<signupResponse> => {
  const response = await axiosInstance.post("auth/signup", values);
  return response.data;
};

export const signInApi = async (values: signInSchemaType): Promise<siginResponse> => {
  const response = await axiosInstance.post("auth/signin", values);
  return response.data;
};

export const verifyApi = async () => {
  const response = await axiosInstance.get("auth/verify");
  return response.data;
};
