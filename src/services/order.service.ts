import { AppError } from "../errors/AppError";
//import { Order } from "../types";
import { Order } from "../entities/order.entity";

const DISCOUNT: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
};

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
