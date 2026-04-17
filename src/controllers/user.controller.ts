import { createUserSchema } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { createUser as createUserRepository } from "../repositories/user.repository";
import { calculateScore } from "../services/user.service";
import { addJob } from "../services/queue.service";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createUserSchema.parse(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const calculateScoreUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, actions } = createUserSchema.parse(req.body);
    const score = calculateScore(actions);

    const user = await createUserRepository(email, score);
    return res.status(200).json({
      email: email,
      score: score,
    });
  } catch (error: any) {
    next(error);
  }
};

export const calculateScoreUserQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, actions } = createUserSchema.parse(req.body);
    //const score = calculateScore(actions);
    console.log("calculateScoreUserQueue");

    addJob({
      email: email,
      actions: actions,
    });

    return res.status(200).json({
      message: "processing started",
    });
  } catch (error: any) {
    next(error);
  }
};
