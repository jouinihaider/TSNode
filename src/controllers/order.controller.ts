import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { orderSchema } from "../models/order.model";
import { calculateSomme } from "../services/order.service";

export const calculateOrder = asyncHandler((req: Request, res: Response) => {
  const orderModel = orderSchema.parse(req.body);
  const result = calculateSomme(orderModel);
  return res.status(200).json(result);
});
