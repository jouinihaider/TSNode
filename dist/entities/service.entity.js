"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oder = void 0;
const AppError_1 = require("../errors/AppError");
class Oder {
    constructor(userId, items, discountCode) {
        this.userId = userId;
        this.items = items;
        this.discountCode = discountCode;
        this.calculateTotal = () => {
            let result = 0;
            for (const item of this.items) {
                if (item.quantity > 100)
                    throw new AppError_1.AppError("Invalid quantity", 400);
                result += item.price * item.quantity;
            }
            return result;
        };
    }
}
exports.Oder = Oder;
