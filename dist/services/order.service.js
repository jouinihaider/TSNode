"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrder = void 0;
const AppError_1 = require("../errors/AppError");
const DISCOUNT = {
    SAVE10: 10,
    SAVE20: 20,
};
const processOrder = (order) => {
    let result = order.calculateTotal();
    if (result < 10)
        throw new AppError_1.AppError("Minimum amount is 10€", 400);
    let discount = 0;
    if (order.discountCode) {
        discount = DISCOUNT[order.discountCode];
        if (discount === undefined)
            throw new AppError_1.AppError("Invalid discount code", 400);
        if (discount === 10 && result < 100)
            throw new AppError_1.AppError("discount code require minimum 100€", 400);
        if (discount === 20 && result < 200)
            throw new AppError_1.AppError("discount code require minimum 200€", 400);
    }
    const finalResult = discount ? result - (result * discount) / 100 : result;
    return {
        userId: order.userId,
        total: result,
        finalTotal: Math.round(finalResult * 100) / 100,
    };
};
exports.processOrder = processOrder;
