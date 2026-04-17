import { AppError } from "../errors/AppError";
import { Item } from "../types";

export class Order {
  constructor(
    public userId: string,
    public items: Item[],
    public discountCode?: string
  ) {}

  calculateTotal(): number {
    let result = 0;

    for (const item of this.items) {
      if (item.quantity > 100)
        throw new AppError("Invalid quantity number", 400);

      result += item.price * item.quantity;
    }

    return result;
  }
}
