import { z } from "zod";

export const searchParamSchema = z.string().min(1, { message: "Product not found." });
