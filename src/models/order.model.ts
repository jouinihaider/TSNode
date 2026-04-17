import { z } from "zod";

const itemSchema = z.object({
  product: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

export const orderSchema = z.object({
  userId: z.string(),
  items: z.array(itemSchema).min(1),
  discountCode: z.enum(["SAVE10", "SAVE20"]).optional(),
});
