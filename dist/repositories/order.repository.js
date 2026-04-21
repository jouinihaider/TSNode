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
exports.deleteOrder = exports.updateOrder = exports.updateOrderByTransaction = exports.getOrderById = exports.getOrdersPaginate = exports.getOrdersPaginate2 = exports.getOrders = exports.createOrder = void 0;
const AppError_1 = require("../errors/AppError");
const prisma_1 = require("../lib/prisma");
const createOrder = (data) => {
    return prisma_1.prisma.order.create({
        data: {
            userId: data.userId,
            total: data.total,
            finalTotal: data.finalTotal,
            discountCode: data === null || data === void 0 ? void 0 : data.discountCode,
            items: {
                create: data.items,
            },
        },
        include: {
            items: true,
        },
    });
};
exports.createOrder = createOrder;
const getOrders = () => {
    return prisma_1.prisma.order.findMany({
        include: {
            items: true,
        },
    });
};
exports.getOrders = getOrders;
const getOrdersPaginate2 = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    console.log("query: ", query);
    const skip = (page - 1) * limit;
    const where = {};
    if (query.userId) {
        where.userId = query.userId;
    }
    const [data, total] = yield prisma_1.prisma.$transaction([
        prisma_1.prisma.order.findMany({
            skip,
            take: limit,
            where,
            include: { items: true },
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.order.count({ where }),
    ]);
    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
exports.getOrdersPaginate2 = getOrdersPaginate2;
const getOrdersPaginate = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let page = query.page || 1;
    let limit = query.limit || 10;
    let skip = page - 1 * limit;
    //prisma.$transaction((tx) => {
    let result = prisma_1.prisma.order.findMany({
        skip,
        take: limit,
        where: {
            userId: query.userId,
        },
    });
    //});
    let total = prisma_1.prisma.order.count({ where: { userId: query.userId } });
    return {
        data: result,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getOrdersPaginate = getOrdersPaginate;
const getOrderById = (id) => {
    const order = prisma_1.prisma.order.findUnique({
        where: { id },
        include: {
            items: true,
        },
    });
    return order;
};
exports.getOrderById = getOrderById;
const updateOrderByTransaction = (id, data) => {
    return prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const orderExistence = yield tx.order.findUnique({
            where: { id },
            include: {
                items: true,
            },
        });
        console.log("data: ", data);
        if (!orderExistence)
            throw new AppError_1.AppError("order not found", 400);
        // await tx.orderItem.deleteMany({
        //   where: {
        //     orderId: id,
        //   },
        // });
        const updated = yield tx.order.update({
            where: {
                id: id,
            },
            data: data,
            include: {
                items: true,
            },
        });
        return updated;
    }));
};
exports.updateOrderByTransaction = updateOrderByTransaction;
const updateOrder = (id, data) => {
    return prisma_1.prisma.order.update({ where: { id }, data });
};
exports.updateOrder = updateOrder;
const deleteOrder = (id) => {
    return prisma_1.prisma.order.delete({ where: { id } });
};
exports.deleteOrder = deleteOrder;
