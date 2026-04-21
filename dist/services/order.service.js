"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrder = exports.getLowestImpactMaterial = exports.processOrder = void 0;
const AppError_1 = require("../errors/AppError");
const material_model_1 = require("../models/material.model");
const DISCOUNT = {
    SAVE10: 10,
    SAVE20: 20,
};
const materialsDB = [
    { id: 1, name: "Concrete", co2_per_unit: 100 },
    { id: 2, name: "Wood", co2_per_unit: 20 },
    { id: 3, name: "Steel", co2_per_unit: 200 },
];
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
//export const getLowestImpactMaterial = (input: {materials: NewMaterial[]}): NewMaterial | null => {};
const getLowestImpactMaterial = (input) => {
    let min = Infinity;
    let bestMaterial = null;
    const materialModel = material_model_1.materialSchema.parse(materialsDB);
    let materialIds = input.materials.map((m) => m.id);
    for (const item of input.materials) {
    }
};
exports.getLowestImpactMaterial = getLowestImpactMaterial;
// const DISCOUNT: Record<string, number> = {
//   SAVE10: 10,
//   SAVE20: 20,
// };
const calculateOrder = (items, discountCode) => {
    if (!Array.isArray(items))
        throw new AppError_1.AppError("items not array", 400);
    let total = items.reduce((acc, item) => {
        item.price * item.quantity;
    }, 0);
    let discount = 0;
    if (discountCode) {
        discount = DISCOUNT[discountCode];
        if (discountCode === undefined) {
            throw new AppError_1.AppError("Invalid discount", 400);
        }
    }
    let finalTotal = total - (total * discount) / 100;
    finalTotal = (Math.round(finalTotal) * 100) / 100;
    return {
        total,
        finalTotal,
    };
};
exports.calculateOrder = calculateOrder;
