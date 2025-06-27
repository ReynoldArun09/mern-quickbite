import AuthWrapper from "@/components/auth/auth-wrapper";
import ForgotForm from "@/components/auth/forms/forgot-form";
import Head from "@/lib/seo/head";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head title="Forgot Password" description={"forgot password page for quickbite food delivery application"} />
      <AuthWrapper authType="FORGOT">
        <ForgotForm />
      </AuthWrapper>
    </>
  );
}
