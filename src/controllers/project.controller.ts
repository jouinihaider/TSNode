import express, { Request, Response } from "express";
import { calculateProjectScore } from "../services/project.service";
import { ProjectSchema } from "../models/project.model";

export const createProject = (req: Request, res: Response) => {
  try {
    //return res.status(200).json({ req: req.body });

    const { name, materials } = ProjectSchema.parse(req.body);

    // if (!name || !Array.isArray(materials))
    //   return res.status(400).json({ error: "invalid data" });

    const result = calculateProjectScore(materials);

    return res.status(200).json({ result: result });
  } catch (error: any) {
    console.log("error : ", error);
  }
};
