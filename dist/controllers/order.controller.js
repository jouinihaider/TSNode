"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrder = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const order_model_1 = require("../models/order.model");
const order_service_1 = require("../services/order.service");
const order_entity_1 = require("../entities/order.entity");
exports.calculateOrder = (0, asyncHandler_1.asyncHandler)((req, res) => {
    const orderModel = order_model_1.orderSchema.parse(req.body);
    const orderService = new order_entity_1.Order(orderModel.userId, orderModel.items, orderModel.discountCode);
    const result = (0, order_service_1.processOrder)(orderService);
    return res.status(200).json(result);
});
