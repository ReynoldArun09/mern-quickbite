import { z } from "zod";

export const cartProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
});

export const cartItemSchema = z.object({
  product: cartProductSchema,
  count: z.number().int().positive().default(1),
});

export const cartItemsSchema = z.array(cartItemSchema).nonempty("cart cannot be empty");
