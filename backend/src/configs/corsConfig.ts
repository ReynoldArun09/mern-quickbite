import { type CorsOptions } from "cors";
import { ParsedEnvVariables } from ".";

/**
 * CORS configuration options.
 *
 * - `origin`: Specifies the allowed origin (frontend/client URL).
 * - `credentials`: Allows cookies and other credentials to be sent with requests.
 * - `methods`: Lists the allowed HTTP methods.
 * - `optionsSuccessStatus`: The status code sent for successful preflight (OPTIONS) requests.
 */
export const corsOptions: CorsOptions = {
  origin: ParsedEnvVariables.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
};
