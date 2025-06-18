import { z } from "zod";

export const cartSchema = z.object({
  productId: z.string().min(1, { message: "product id is missing" }),
  count: z.number().positive(),
});

export const productParams = z.string().min(1, { message: "Invalid product id" });

export type cartSchemaType = z.infer<typeof cartSchema>;
