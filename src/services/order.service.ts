import { AppError } from "../errors/AppError";
import { Order } from "../types";

const DISCOUNT: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
};

export const calculateSomme = (order: Order) => {
  let result = 0;

  for (const item of order.items) {
    result += item.price * item.quantity;
  }

  let discount = 0;

  if (order.discountCode) {
    discount = DISCOUNT[order.discountCode];

    if (discount === undefined)
      throw new AppError("Invalid discount code", 400);
  }

  const finalResult = result - (result * discount) / 100;

  return {
    userId: order.userId,
    total: result,
    finalTotal: Math.round(finalResult * 100) / 100,
  };
};
