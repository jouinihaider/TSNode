"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSomme = void 0;
const AppError_1 = require("../errors/AppError");
const DISCOUNT = {
    SAVE10: 10,
    SAVE20: 20,
};
const calculateSomme = (order) => {
    let result = 0;
    for (const item of order.items) {
        result += item.price * item.quantity;
    }
    let discount = 0;
    if (order.discountCode) {
        discount = DISCOUNT[order.discountCode];
        if (discount === undefined)
            throw new AppError_1.AppError("Invalid discount code", 400);
    }
    const finalResult = result - (result * discount) / 100;
    return {
        userId: order.userId,
        total: result,
        finalTotal: Math.round(finalResult * 100) / 100,
    };
};
exports.calculateSomme = calculateSomme;
