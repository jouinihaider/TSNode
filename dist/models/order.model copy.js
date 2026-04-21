"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
const itemSchema = zod_1.z.object({
    product: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
});
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    items: zod_1.z.array(itemSchema).min(1),
    discountCode: zod_1.z.enum(["SAVE10", "SAVE20"]).optional(),
});
