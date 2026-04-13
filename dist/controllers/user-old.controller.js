"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = calculateScore;
const IMPACTS = {
    login: 1,
    purchase: 10,
};
function calculateScore(user) {
    let totalScore = 0;
    const { email, actions } = user;
    if (!email || !Array.isArray(actions))
        throw new Error("invalid types");
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
