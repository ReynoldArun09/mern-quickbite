import AuthWrapper from "@/components/auth/auth-wrapper";
import SignUpForm from "@/components/auth/forms/signup-form";
import Head from "@/lib/seo/head";

export default function SignUpPage() {
  return (
    <>
      <Head title="Sign up" description={"sign up page for quickbite food delivery application"} />
      <AuthWrapper authType="SIGN_UP">
        <SignUpForm />
      </AuthWrapper>
    </>
  );
}
