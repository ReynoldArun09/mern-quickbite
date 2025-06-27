import { v2 as cloudinary } from "cloudinary";
import app from "./app";
import { InitializeMongoConnection, ParsedEnvVariables } from "./configs";
import { logServerFailed, logServerStarted } from "./helpers";
import { customLogger } from "./utils";

const { PORT, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = ParsedEnvVariables;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const startServer = async () => {
  try {
    await InitializeMongoConnection();
    app.listen(PORT, logServerStarted);
  } catch (error) {
    logServerFailed();
    process.exit(1);
  }
};

startServer();

process.on("uncaughtException", (error: Error) => {
  customLogger.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
  customLogger.error("Unhandled Rejection at:", error);
  process.exit(1);
});
