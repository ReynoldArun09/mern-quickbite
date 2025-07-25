import dotenv from "dotenv";
import { z } from "zod";
import { GlobalErrorMessages, ValidationMessages } from "../constants";
import { customLogger } from "../utils";

dotenv.config();

const cloudinarySchema = z.object({
  CLOUDINARY_CLOUD_NAME: z.string().min(1, { message: ValidationMessages.CLOUDINARY_CLOUD_NAME_REQUIRED }),
  CLOUDINARY_API_KEY: z.string().min(1, { message: ValidationMessages.CLOUDINARY_API_KEY_REQUIRED }),
  CLOUDINARY_API_SECRET: z.string().min(1, { message: ValidationMessages.CLOUDINARY_API_SECRET_REQUIRED }),
});

const EnvVariables = z.object({
  ...cloudinarySchema.shape,
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  MONGO_DB_URI: z.string().min(1, { message: ValidationMessages.MONGO_DB_URI_REQUIRED }),
  ACCESS_TOKEN_SECRET: z.string().min(10, { message: ValidationMessages.ACCESS_TOKEN_SECRET_LENGTH }),
  CORS_ORIGIN: z.string().min(1, { message: ValidationMessages.CORS_ORIGIN_REQUIRED }),
  SALT: z.string().min(2, { message: ValidationMessages.SALT_REQUIRED }),
  STRIPE_KEY: z.string().min(2, { message: ValidationMessages.STRIPE_KEY_REQUIRED }),
  REDIS_URL: z.string().min(5, { message: ValidationMessages.REDIS_URL }),
  RESEND_API_KEY: z.string().min(1, { message: "RESEND_API_KEY is required" }),
});

type EnvVariablesType = z.infer<typeof EnvVariables>;

const envVariables = (): EnvVariablesType => {
  try {
    return EnvVariables.parse(process.env);
  } catch (error) {
    customLogger.error(GlobalErrorMessages.ENV_PARSE_ERROR, error);
    process.exit(1);
  }
};

export const ParsedEnvVariables = envVariables();
