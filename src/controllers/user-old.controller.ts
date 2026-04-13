type Action = {
  type: string;
  count: number;
};

type User = {
  email: string;
  actions: Action[];
};

const IMPACTS: Record<string, number> = {
  login: 1,
  purchase: 10,
};

export function calculateScore(user: User) {
  let totalScore = 0;

  const { email, actions } = user;
  if (!email || !Array.isArray(actions)) throw new Error("invalid types");
  for (const action of actions) {
    const impact = IMPACTS[action.type];

    if (impact === undefined)
      throw new Error(`invalid action type: ${action.type}`);
    if (action.count <= 0) throw new Error("invalid count");

    totalScore += action.count * impact;
  }
  return totalScore;
}
