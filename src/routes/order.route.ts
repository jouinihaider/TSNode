import Express, { Router, Request, Response } from "express";
import {
  createOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
  getAllOrders,
  calculateOrder,
  updateOrderByTransaction,
  getOrdersPaginated,
} from "../controllers/order.controller";
const router = Router();

router.get("/list", getAllOrders);
router.get("/list-p", getOrdersPaginated);
router.get("/", getOrderById);
router.post("/", createOrder);
router.patch("/", updateOrder);
router.patch("/transaction", updateOrderByTransaction);
router.delete("/", deleteOrder);
router.post("/calculate", calculateOrder);

export default router;
