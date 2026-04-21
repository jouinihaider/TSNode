import { z } from "zod";

export const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  co2_per_unit: z.number(),
});
