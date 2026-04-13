// export type ProjectType = {
//   name: string;
//   materials: Material;
// };

export type Material = {
  type: string;
  quantity: number;
};

const IMPACTS: Record<string, number> = { steel: 5, wood: 2 };

export function calculateProjectScore(materials: Material[]): number {
  let totalScore = 0;

  for (const material of materials) {
    const impact = IMPACTS[material.type];

    if (!impact) throw new Error("error type");

    totalScore += material.quantity * impact;
  }
  return totalScore;
}
