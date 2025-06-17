import AuthWrapper from "../../components/auth/auth-wrapper";
import SignInForm from "../../components/auth/forms/signin-form";

export default function SignInPage() {
  return (
    <AuthWrapper authType="SIGN_IN">
      <SignInForm />
    </AuthWrapper>
  );
}
