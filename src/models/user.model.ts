import { count } from "console";
import { z } from "zod";

const actionSchema = z.object({
  type: z.enum(["login", "purchase"]),
  count: z.number().positive(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  actions: z.array(actionSchema).min(1),
});
