import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { orderSchema } from "../models/order.model";
import { processOrder } from "../services/order.service";
import { Order as OrderEntity } from "../entities/order.entity";
import {
  createOrder as createOrderRepository,
  updateOrder as updateOrderRepository,
  updateOrderByTransaction as updateOrderByTransactionRepository,
  getOrders as getOrdersRepository,
  deleteOrder as deleteOrderRepository,
  getOrderById as getOrderByIdRepository,
  getOrdersPaginated as getOrdersPaginatedRepository,
} from "../repositories/order.repository";
import { AppError } from "../errors/AppError";
import { NewMaterial } from "../types";

const materialsDB: NewMaterial[] = [
  { id: 1, name: "Concrete", co2_per_unit: 100 },
  { id: 2, name: "Wood", co2_per_unit: 20 },
  { id: 3, name: "Steel", co2_per_unit: 200 },
];

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getOrdersRepository();
    return res.status(200).json(result);
  }
);

export const getOrdersPaginated = asyncHandler(async (req, res) => {
  const result = await getOrdersPaginatedRepository(req.query);
  return res.json(result);
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.query.id;
    const result = await getOrderByIdRepository(id);

    if (!result) {
      throw new AppError("Order not found", 404);
    }
    return res.status(200).json(result);
  }
);

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const id = req.query.id;
  let result = null;
  console.log("id: ", id);

  if (id != null) result = await deleteOrderRepository(id as string);
  return res.status(200).json(result);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const id = req.query.id;
  const data = orderSchema.parse(req.body);

  const updated = await updateOrderRepository(id as string, {
    userId: data.userId,
  });
  return res.status(200).json({ message: "updated", updated });
});

export const updateOrderByTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.query.id;
    const orderModel = orderSchema.parse(req.body);
    const orderService = new OrderEntity(
      orderModel.userId,
      orderModel.items,
      orderModel.discountCode
    );
    const result = processOrder(orderService);

    const updated = await updateOrderByTransactionRepository(id as string, {
      userId: orderModel.userId,
      total: result.total,
      finalTotal: result.finalTotal,
      items: { deleteMany: {}, create: orderModel.items },
      discountCode: orderModel.discountCode,
    });
    return res.status(200).json({ message: "updated", updated });
  }
);

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderModel = orderSchema.parse(req.body);
  const orderService = new OrderEntity(
    orderModel.userId,
    orderModel.items,
    orderModel.discountCode
  );
  const result = processOrder(orderService);
  const saved = await createOrderRepository({
    userId: orderModel.userId,
    total: result.total,
    finalTotal: result.finalTotal,
    discountCode: orderModel.discountCode,
    items: orderModel.items,
  });

  return res.status(200).json({ message: "Done", saved });
});

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

export const getLowestImpactMaterial = (req: Request, res: Response) => {};
