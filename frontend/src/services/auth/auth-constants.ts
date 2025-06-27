export const AUTH_ENDPOINTS = {
  SIGN_UP: "auth/signup",
  SIGN_IN: "auth/signin",
  SIGN_OUT: "auth/signout",
  VERIFY_USER: "auth/verify",
  FORGOT_PASSWORD: "/auth/forgot-password",
  UPDATE_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
} as const;

export const AUTH_QUERY_KEYS = {
  VERIFY_KEY: ["q-verify-user"],
} as const;

export const AUTH_MUTATION_KEYS = {
  SIGN_UP_KEY: ["m-signup-user"],
  SIGN_IN_KEY: ["m-signin-user"],
  SIGN_OUT_KEY: ["m-signout-user"],
  FORGOT_PASSWORD_KEY: ["m-forgot-user"],
} as const;
