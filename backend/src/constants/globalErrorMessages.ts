export enum GlobalErrorMessages {
  DEV_SERVER_FAILED_TO_START = "Oops! The development server failed to start. 😔",
  SERVER_FAILED_TO_START = "Sorry, the server couldn't start. Please try again later. 😞",
  ENV_PARSE_ERROR = "There was an issue parsing environment variables. Please check the configuration. 🔧",
  MONGO_ENV_NOT_DEFINED = "MongoDB connection URI is not defined. Please configure it in the environment. 🛠️",
  MONGO_CONNECTION_ERROR = "There was an error connecting to MongoDB. Please check the connection details. 💥",
  UNAUTHORIZED = "You are not authorized to perform this action. Please check your permissions. 🔒",
  INVALID_TOKEN = "The token is invalid or has expired. Please log in again. 🔑",
}
