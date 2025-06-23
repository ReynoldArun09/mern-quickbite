import { z } from "zod";

export const searchParamSchema = z.object({
  searchTerm: z.string().trim().min(1, { message: "Product not found." }),
});
