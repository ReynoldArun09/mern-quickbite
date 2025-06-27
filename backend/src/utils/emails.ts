import { Resend } from "resend";
import { ParsedEnvVariables } from "../configs";
import { forgotPasswordTemplate, passwordResetSuccessTemplate } from "../helpers";

function getResendInstance() {
  const apiKey = ParsedEnvVariables.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }

  return new Resend(apiKey);
}

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const resend = getResendInstance();
  const verificationLink = `${ParsedEnvVariables.CORS_ORIGIN}/auth/reset-password/${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset password",
    html: forgotPasswordTemplate(verificationLink, email),
  });
};

export const sendForgotPasswordSuccessEmail = async (email: string) => {
  const resend = getResendInstance();
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset success",
    html: passwordResetSuccessTemplate(email),
  });
};
