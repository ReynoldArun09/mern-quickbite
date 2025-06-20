import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInApi, signOutApi, signUpApi } from "./auth-api";

export function useSignUpMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["signup-key"],
    mutationFn: signUpApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useSignInMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["signin-key"],
    mutationFn: signInApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signout-key"],
    mutationFn: signOutApi,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["verify-key"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}
