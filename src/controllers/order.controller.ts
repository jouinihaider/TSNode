import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { orderSchema } from "../models/order.model";
import { processOrder } from "../services/order.service";
import { Order as OrderEntity } from "../entities/order.entity";

export const calculateOrder = asyncHandler((req: Request, res: Response) => {
  const orderModel = orderSchema.parse(req.body);
  const orderService = new OrderEntity(
    orderModel.userId,
    orderModel.items,
    orderModel.discountCode
  );
  const result = processOrder(orderService);
  return res.status(200).json(result);
});
