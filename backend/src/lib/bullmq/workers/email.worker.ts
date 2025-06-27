import { Worker } from "bullmq";
import { bullmqConnection } from "../../../configs";
import { customLogger, sendForgotPasswordEmail, sendForgotPasswordSuccessEmail } from "../../../utils";

export const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { name, data } = job;

    try {
      switch (name) {
        case "FORGOT_PASSWORD":
          await sendForgotPasswordEmail(data.email, data.token);
          break;
        case "RESET_PASSWORD_SUCCESS":
          await sendForgotPasswordSuccessEmail(data.email);
          break;
        default:
          throw new Error(`Unknown job type ${name}`);
      }
    } catch (error) {
      customLogger.error(`Job ${name} failed:`, error);
      throw error;
    }
  },
  {
    connection: bullmqConnection,
  }
);
