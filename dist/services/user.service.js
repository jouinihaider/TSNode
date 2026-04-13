"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = calculateScore;
const AppError_1 = require("../errors/AppError");
const IMPACTS = {
    login: 1,
    purchase: 10,
};
function calculateScore(actions) {
    let totalScore = 0;
    for (const action of actions) {
        const impact = IMPACTS[action.type];
        if (impact === undefined)
            throw new AppError_1.AppError(`invalid action type: ${action.type}`, 400);
        if (action.count <= 0)
            throw new AppError_1.AppError("invalid count", 400);
        totalScore += action.count * impact;
    }
    return totalScore;
}
