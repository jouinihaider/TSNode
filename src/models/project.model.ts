import { z } from "zod";

const MaterialSchema = z.object({
  type: z.string(),
  quantity: z.number().positive(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  materials: z.array(MaterialSchema),
});
