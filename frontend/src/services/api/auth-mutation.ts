import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInApi, signUpApi } from "./auth-api";

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
