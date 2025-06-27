import AuthWrapper from "@/components/auth/auth-wrapper";
import ResetPasswordForm from "@/components/auth/forms/resetpassword-form";

export default function ResetPasswordPage() {
  return (
    <AuthWrapper authType="RESET">
      <ResetPasswordForm />
    </AuthWrapper>
  );
}
