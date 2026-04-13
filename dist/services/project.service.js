"use strict";
// export type ProjectType = {
//   name: string;
//   materials: Material;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProjectScore = calculateProjectScore;
const IMPACTS = { steel: 5, wood: 2 };
function calculateProjectScore(materials) {
    let totalScore = 0;
    for (const material of materials) {
        const impact = IMPACTS[material.type];
        if (!impact)
            throw new Error("error type");
        totalScore += material.quantity * impact;
    }
    return totalScore;
}
