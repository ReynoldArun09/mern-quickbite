import { v2 as cloudinary } from "cloudinary";
import { ParsedEnvVariables } from "../configs";
import { GlobalErrorMessages, GlobalSuccessMessages } from "../constants";
import { customLogger } from "../utils";

export const logServerStarted = () => {
  customLogger.info(
    ParsedEnvVariables.NODE_ENV === "development"
      ? GlobalSuccessMessages.DEV_SERVER_STARTED
      : GlobalSuccessMessages.SERVER_STARTED
  );
};

export const logServerFailed = () => {
  customLogger.error(
    ParsedEnvVariables.NODE_ENV === "development"
      ? GlobalErrorMessages.DEV_SERVER_FAILED_TO_START
      : GlobalErrorMessages.SERVER_FAILED_TO_START
  );
};

export const uploadImage = async (file: Express.Multer.File) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.uploader.upload(dataUri, { folder: "quickbite" });
  return uploadResponse.url;
};

export const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const forgotPasswordTemplate = (resetLink: string, email: string) => {
  return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>We received a request to reset your password for your account associated with <strong>${email}</strong>.</p>
          <p>Please click the link below to reset your password:</p>
          <div style="background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px; padding: 15px; text-align: center;">
            <a href="${resetLink}" style="font-size: 18px; color: #4CAF50; text-decoration: none;">Reset Your Password</a>
          </div>
          <p>If you didn't request this, please ignore this email. Your password will not change until you access the link above and create a new one.</p>
          <p style="font-size: 12px; color: #888;">
            Please do not reply to this email. For assistance, contact support through our website.
          </p>
          <p>Best regards,<br>QuickBite Team</p>
        </div>
      `;
};

export const passwordResetSuccessTemplate = (email: string) => {
  return `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Your Password Has Been Reset Successfully</h2>
            <p>Hi there,</p>
            <p>This is to confirm that your password for the account associated with <strong>${email}</strong> has been successfully reset.</p>
            <p>If you did not make this change, please contact our support team immediately to secure your account.</p>
            <p>Thank you for using our service!</p>
            <p style="font-size: 12px; color: #888;">
              Please do not reply to this email. For assistance, contact support through our website.
            </p>
            <p>Best regards,<br>QuickBite Team</p>
          </div>
        `;
};
