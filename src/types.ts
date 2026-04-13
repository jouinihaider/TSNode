export type Material = {
  type: string;
  quantity: number;
};

export type ProjectType = {
  name: string;
  materials: Material;
};

export type Action = {
  type: "login" | "purchase";
  count: number;
};
