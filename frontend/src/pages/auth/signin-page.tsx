import AuthWrapper from "@/components/auth/auth-wrapper";
import SignInForm from "@/components/auth/forms/signin-form";
import Head from "@/lib/seo/head";

export default function SignInPage() {
  return (
    <>
      <Head title={"Sign in"} description={"sign in page for quickbite food delivery application"} />
      <AuthWrapper authType="SIGN_IN">
        <SignInForm />
      </AuthWrapper>
    </>
  );
}
