export type Material = {
  type: string;
  quantity: number;
};

export type NewMaterial = {
  id: number;
  name: string;
  co2_per_unit: number;
};

export type ProjectType = {
  name: string;
  materials: Material;
};

export type Action = {
  type: "login" | "purchase";
  count: number;
};

export type Item = { product: string; price: number; quantity: number };

export type Order = {
  userId: string;
  items: Item[];
  discountCode?: "SAVE10" | "SAVE20";
};

export type Record<> = {
  SAVE10: 10;
  SAVE20: 20;
};
