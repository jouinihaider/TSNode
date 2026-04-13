"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = calculateScore;
const IMPACTS = {
    login: 1,
    purchase: 10,
};
function calculateScore(actions) {
    let totalScore = 0;
    for (const action of actions) {
        const impact = IMPACTS[action.type];
        if (impact === undefined)
            throw new Error(`invalid action type: ${action.type}`);
        if (action.count <= 0)
            throw new Error("invalid count");
        totalScore += action.count * impact;
    }
    return totalScore;
}
