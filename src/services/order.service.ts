import { AppError } from "../errors/AppError";
//import { Order } from "../types";
import { Order } from "../entities/order.entity";
import { NewMaterial } from "../types";
import { materialSchema } from "../models/material.model";

const DISCOUNT: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
};

const materialsDB: NewMaterial[] = [
  { id: 1, name: "Concrete", co2_per_unit: 100 },
  { id: 2, name: "Wood", co2_per_unit: 20 },
  { id: 3, name: "Steel", co2_per_unit: 200 },
];

export const processOrder = (order: Order) => {
  let result = order.calculateTotal();

  if (result < 10) throw new AppError("Minimum amount is 10€", 400);

  let discount = 0;

  if (order.discountCode) {
    discount = DISCOUNT[order.discountCode];

    if (discount === undefined)
      throw new AppError("Invalid discount code", 400);
    if (discount === 10 && result < 100)
      throw new AppError("discount code require minimum 100€", 400);
    if (discount === 20 && result < 200)
      throw new AppError("discount code require minimum 200€", 400);
  }

  const finalResult = discount ? result - (result * discount) / 100 : result;

  return {
    userId: order.userId,
    total: result,
    finalTotal: Math.round(finalResult * 100) / 100,
  };
};

//export const getLowestImpactMaterial = (input: {materials: NewMaterial[]}): NewMaterial | null => {};
export const getLowestImpactMaterial = (input: {
  materials: NewMaterial[];
}) => {
  let min = Infinity;
  let bestMaterial = null;
  const materialModel = materialSchema.parse(materialsDB);

  let materialIds = input.materials.map((m) => m.id);

  for (const item of input.materials) {
  }
};

type Item = {
  product: string;
  price: number;
  quantity: number;
};

// const DISCOUNT: Record<string, number> = {
//   SAVE10: 10,
//   SAVE20: 20,
// };

export const calculateOrder = (items: Item[], discountCode?: string) => {
  if (!Array.isArray(items)) throw new AppError("items not array", 400);
  let total: number = items.reduce((acc: any, item) => {
    item.price * item.quantity;
  }, 0);

  let discount = 0;
  if (discountCode) {
    discount = DISCOUNT[discountCode];

    if (discountCode === undefined) {
      throw new AppError("Invalid discount", 400);
    }
  }

  let finalTotal = total - (total * discount) / 100;
  finalTotal = (Math.round(finalTotal) * 100) / 100;

  return {
    total,
    finalTotal,
  };
};
