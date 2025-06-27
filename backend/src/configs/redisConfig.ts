import { createClient } from "redis";
import { URL } from "url";
import { customLogger } from "../utils";
import { ParsedEnvVariables } from "./appConfig";

const redisUrl = ParsedEnvVariables.REDIS_URL;
const parsed = new URL(redisUrl);

export const redisConnection = {
  host: parsed.hostname,
  port: Number(parsed.port),
  password: parsed.password,
  tls: parsed.protocol === "rediss:" ? {} : undefined,
};

export const bullmqConnection = redisConnection;

export const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => {
  customLogger.error("Redis Client Error:", err);
});

export const connectRedisClient = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    customLogger.info("Redis client connected");
  }
};
