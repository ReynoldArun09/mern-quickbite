import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import { corsOptions } from "./configs";
import { errorMiddleware } from "./middlewares";
import { authRoutes } from "./routes";

/** initialize express app */
const app: Application = express();

/** Middlewares */
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

/** Routes */
app.use("/api/v1/auth", authRoutes);

/** global error handling middlware */
app.use(errorMiddleware);

export default app;
