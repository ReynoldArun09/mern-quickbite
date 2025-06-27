import { Queue } from "bullmq";
import { bullmqConnection } from "../../../configs";
import { customLogger } from "../../../utils";

export const emailQueue = new Queue("emailQueue", {
  connection: bullmqConnection,
});

async function removeExpiredJobs() {
  const jobs = await emailQueue.getWaiting();
  const now = Date.now();

  const expiredJobs = jobs.filter((job) => now - job.timestamp > 600000);

  for (const job of expiredJobs) {
    await job.remove();
    customLogger.warn(`Removed expired job ${job.id}`);
  }
}

removeExpiredJobs().catch(console.error);
