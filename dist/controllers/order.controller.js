"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowestImpactMaterial = exports.calculateOrder = exports.createOrder = exports.updateOrderByTransaction = exports.updateOrder = exports.deleteOrder = exports.getOrderById = exports.getOrdersPaginated = exports.getAllOrders = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const order_model_1 = require("../models/order.model");
const order_service_1 = require("../services/order.service");
const order_entity_1 = require("../entities/order.entity");
const order_repository_1 = require("../repositories/order.repository");
const AppError_1 = require("../errors/AppError");
const materialsDB = [
    { id: 1, name: "Concrete", co2_per_unit: 100 },
    { id: 2, name: "Wood", co2_per_unit: 20 },
    { id: 3, name: "Steel", co2_per_unit: 200 },
];
exports.getAllOrders = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, order_repository_1.getOrders)();
    return res.status(200).json(result);
}));
exports.getOrdersPaginated = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, order_repository_1.getOrdersPaginated)(req.query);
    return res.json(result);
}));
exports.getOrderById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const result = yield (0, order_repository_1.getOrderById)(id);
    if (!result) {
        throw new AppError_1.AppError("Order not found", 404);
    }
    return res.status(200).json(result);
}));
exports.deleteOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    let result = null;
    console.log("id: ", id);
    if (id != null)
        result = yield (0, order_repository_1.deleteOrder)(id);
    return res.status(200).json(result);
}));
exports.updateOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const data = order_model_1.orderSchema.parse(req.body);
    const updated = yield (0, order_repository_1.updateOrder)(id, {
        userId: data.userId,
    });
    return res.status(200).json({ message: "updated", updated });
}));
exports.updateOrderByTransaction = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const orderModel = order_model_1.orderSchema.parse(req.body);
    const orderService = new order_entity_1.Order(orderModel.userId, orderModel.items, orderModel.discountCode);
    const result = (0, order_service_1.processOrder)(orderService);
    const updated = yield (0, order_repository_1.updateOrderByTransaction)(id, {
        userId: orderModel.userId,
        total: result.total,
        finalTotal: result.finalTotal,
        items: { deleteMany: {}, create: orderModel.items },
        discountCode: orderModel.discountCode,
    });
    return res.status(200).json({ message: "updated", updated });
}));
exports.createOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderModel = order_model_1.orderSchema.parse(req.body);
    const orderService = new order_entity_1.Order(orderModel.userId, orderModel.items, orderModel.discountCode);
    const result = (0, order_service_1.processOrder)(orderService);
    const saved = yield (0, order_repository_1.createOrder)({
        userId: orderModel.userId,
        total: result.total,
        finalTotal: result.finalTotal,
        discountCode: orderModel.discountCode,
        items: orderModel.items,
    });
    return res.status(200).json({ message: "Done", saved });
}));
exports.calculateOrder = (0, asyncHandler_1.asyncHandler)((req, res) => {
    const orderModel = order_model_1.orderSchema.parse(req.body);
    const orderService = new order_entity_1.Order(orderModel.userId, orderModel.items, orderModel.discountCode);
    const result = (0, order_service_1.processOrder)(orderService);
    return res.status(200).json(result);
});
const getLowestImpactMaterial = (req, res) => { };
exports.getLowestImpactMaterial = getLowestImpactMaterial;
