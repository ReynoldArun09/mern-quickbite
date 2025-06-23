import { ParsedEnvVariables } from "../configs";
import { GlobalErrorMessages, GlobalSuccessMessages } from "../constants";
import { customLogger } from "../utils";

const { NODE_ENV } = ParsedEnvVariables;

export const logServerStarted = () => {
  customLogger.info(
    NODE_ENV === "development" ? GlobalSuccessMessages.DEV_SERVER_STARTED : GlobalSuccessMessages.SERVER_STARTED
  );
};

export const logServerFailed = () => {
  customLogger.error(
    NODE_ENV === "development"
      ? GlobalErrorMessages.DEV_SERVER_FAILED_TO_START
      : GlobalErrorMessages.SERVER_FAILED_TO_START
  );
};

export const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
