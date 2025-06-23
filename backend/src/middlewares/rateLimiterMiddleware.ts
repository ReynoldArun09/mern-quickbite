import rateLimit from "express-rate-limit";
import { GlobalErrorMessages } from "../constants";

/** Rate limiting for signup and signin endpoints
 * @package `express-rate-limit`
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: GlobalErrorMessages.AUTH_RATE_LIMIT,
});
