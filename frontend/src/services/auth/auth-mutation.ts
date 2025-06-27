import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { forgotPasswordApi, resetPasswordApi, signInApi, signOutApi, signUpApi } from "./auth-api";
import { AUTH_MUTATION_KEYS, AUTH_QUERY_KEYS } from "./auth-constants";

export function useSignUpMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.SIGN_UP_KEY,
    mutationFn: signUpApi,
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
      navigate("/auth/sign-in", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create account");
    },
  });
}

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.SIGN_IN_KEY,
    mutationFn: signInApi,
    onSuccess: async (data) => {
      if (data?.data) {
        queryClient.setQueryData(AUTH_QUERY_KEYS.VERIFY_KEY, data.data);
      }
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.VERIFY_KEY });
      toast.success(data.message || "Welcome back!");
      const returnUrl = new URLSearchParams(window.location.search).get("returnUrl");
      const redirectPath = returnUrl || (data?.data.role === "admin" ? "/admin-dashboard" : "/");
      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to sign in");
    },
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.SIGN_OUT_KEY,
    mutationFn: signOutApi,
    onSuccess: async (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.VERIFY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.VERIFY_KEY });
      queryClient.clear();
      toast.success(data.message || "Signed Out successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useForgoutPasswordMutation() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.FORGOT_PASSWORD_KEY,
    mutationFn: forgotPasswordApi,
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useUpdatePasswordMutation(token: string) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.FORGOT_PASSWORD_KEY,
    mutationFn: (password: string) => resetPasswordApi(token, password),
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}
