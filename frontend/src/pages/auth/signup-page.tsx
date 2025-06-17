import AuthWrapper from "../../components/auth/auth-wrapper";
import SignUpForm from "../../components/auth/forms/signup-form";

export default function SignUpPage() {
  return (
    <AuthWrapper authType="SIGN_UP">
      <SignUpForm />
    </AuthWrapper>
  );
}
