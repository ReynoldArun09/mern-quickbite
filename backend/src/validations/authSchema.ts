import { z } from "zod";

export const signUpSchema = z.object({
  firstname: z.string().min(1, "firstname is required"),
  lastname: z.string().min(1, "lastname is required"),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
  mobile: z.string().regex(/^\+91\d{10}$/, "Mobile number must start with +91 and be followed by exactly 10 digits."),
});

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Invalid credentinals"),
  rememberMe: z.boolean().optional().default(false),
});

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const resetTokenSchema = z.object({
  token: z.string().min(20, "Invalid credentinals"),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type signInSchemaType = z.infer<typeof signInSchema>;
