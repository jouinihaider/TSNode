import { NextFunction, Request, Response } from "express";
import { AppError2 } from "../errors/AppError2";

export const errorHandler = (
  req: Request,
  res: Response,
  nex: NextFunction,
  err: any
) => {
  if (err instanceof AppError2) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(err.statusCode).json({
    message: "internal server",
  });
};
