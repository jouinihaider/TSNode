import { Action } from "../types";
import { AppError } from "../errors/AppError";

const IMPACTS: Record<Action["type"], number> = {
  login: 1,
  purchase: 10,
};

export function calculateScore(actions: Action[]) {
  let totalScore = 0;

  for (const action of actions) {
    const impact = IMPACTS[action.type];

    if (impact === undefined)
      throw new AppError(`invalid action type: ${action.type}`, 400);
    if (action.count <= 0) throw new AppError("invalid count", 400);

    totalScore += action.count * impact;
  }

  return totalScore;
}
