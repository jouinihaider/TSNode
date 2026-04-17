"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const AppError_1 = require("../errors/AppError");
class Order {
    constructor(userId, items, discountCode) {
        this.userId = userId;
        this.items = items;
        this.discountCode = discountCode;
    }
    calculateTotal() {
        let result = 0;
        for (const item of this.items) {
            if (item.quantity > 100)
                throw new AppError_1.AppError("Invalid quantity number", 400);
            result += item.price * item.quantity;
        }
        return result;
    }
}
exports.Order = Order;
