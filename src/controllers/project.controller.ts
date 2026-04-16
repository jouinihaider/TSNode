import { Request, Response } from "express";
import { calculateProjectScore } from "../services/project.service";
import { ProjectSchema } from "../models/project.model";
import { asyncHandler } from "../utils/asyncHandler";

export const createProject = asyncHandler((req: Request, res: Response) => {
  const { materials } = ProjectSchema.parse(req.body);

  const result = calculateProjectScore(materials);

  return res.status(200).json({ result: result });
});

// export const createProject = (req: Request, res: Response) => {
//   try {
//     const { materials } = ProjectSchema.parse(req.body);

//     const result = calculateProjectScore(materials);

//     return res.status(200).json({ result: result });
//   } catch (error: any) {
//     console.log("error : ", error);
//   }
// };
