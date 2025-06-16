import { createLogger, format, transports } from "winston";

const formatStyle = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
);

/**
 *   CustomLogger is a pre-configured Winston logger used throughout the application.
 *
 * - Logs are colorized and include timestamps in "YYYY-MM-DD HH:mm:ss" format.
 * - All logs (info and above) are printed to the console.
 * - Only error-level logs are written to "error.log".
 */
export const customLogger = createLogger({
  level: "info",
  format: formatStyle,
  transports: [new transports.Console(), new transports.File({ filename: "error.log", level: "error" })],
});
