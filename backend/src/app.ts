import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";

import { corsOptions } from "./configs";
import { errorMiddleware } from "./middlewares";
import { adminRoutes, authRoutes, cartRoutes, paymentRoutes, productRoutes } from "./routes";

import "./lib/bullmq/workers/email.worker";

/** initialize express app */
const app: Application = express();
const base_url = "/api/v1";

/** Middlewares */
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.use(`${base_url}/auth`, authRoutes);
app.use(`${base_url}/product`, productRoutes);
app.use(`${base_url}/cart`, cartRoutes);
app.use(`${base_url}/admin`, adminRoutes);
app.use(`${base_url}/payment`, paymentRoutes);

app.use(errorMiddleware);

export default app;
