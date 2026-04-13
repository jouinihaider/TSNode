import { createUserSchema } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { calculateScore } from "../services/user.service";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createUserSchema.parse(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const calculateScoreUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, actions } = createUserSchema.parse(req.body);
    const score = calculateScore(actions);
    return res.status(200).json({
      email: email,
      score: score,
    });
  } catch (error: any) {
    next(error);
  }
};
