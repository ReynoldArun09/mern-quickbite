import AuthWrapper from "@/components/auth/auth-wrapper";
import Head from "@/lib/seo/head";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head title="Forgot Password" description={"forgout password page for quickbite food delivery application"} />
      <AuthWrapper authType="RESET">forgot password</AuthWrapper>;
    </>
  );
}
