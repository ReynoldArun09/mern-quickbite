import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be 6 or more characters long" })
    .max(20, { message: "Password must be 16 or fewer characters long" }),
  firstname: z
    .string({ required_error: "Firstname is required" })
    .min(4, { message: "Firstname must be 4 or more characters long" }),
  lastname: z
    .string({ required_error: "Lastname is required" })
    .min(4, { message: "Lastname must be 4 or more characters long" }),
   mobile: z.string().regex(/^\+91\d{10}$/, "Mobile number must start with +91 and be followed by exactly 10 digits."),
});

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" }),
  rememberMe: z.boolean(),
});

export const UpdateSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be 6 or more characters long" })
      .max(20, { message: "Password must be 16 or fewer characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const emailSChema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
});

export type emailType = z.infer<typeof emailSChema>;
export type signInSchemaType = z.infer<typeof signInSchema>;
export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type UpdateSchemaType = z.infer<typeof UpdateSchema>;
