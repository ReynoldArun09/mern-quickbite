import { z } from "zod";

export const searchParamSchema = z.object({
  searchTerm: z.string().trim().min(1, { message: "Product not found." }),
});

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),

  price: z.preprocess((val) => parseFloat(val as string), z.number()),
  originalPrice: z.preprocess((val) => parseFloat(val as string), z.number().optional()),
  discount: z.preprocess((val) => parseFloat(val as string), z.number().min(0).max(100)),
  starRating: z.preprocess((val) => parseFloat(val as string), z.number().min(0).max(5)),

  available: z.preprocess((val) => val === "true", z.boolean()),
  vegetarian: z.preprocess((val) => val === "true", z.boolean()),

  ingredients: z.preprocess((val) => (typeof val === "string" ? JSON.parse(val) : val), z.array(z.string())),
});

export type createProductSchemaType = z.infer<typeof createProductSchema>;
