/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/auth/sign-in";
      }
      const message = (error.response.data as any)?.message || "Something went wrong";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(new Error("Network error or server not reachable."));
  }
);
