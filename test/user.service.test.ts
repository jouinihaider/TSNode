import { calculateScore } from "../src/services/user.service";
import { Action } from "../src/types";

describe("users", () => {
  it("should calculate score user", () => {
    const actions: Action[] = [
      { type: "login", count: 2 },
      { type: "purchase", count: 1 },
    ];

    const result = calculateScore(actions);

    expect(result).toBe(2 * 1 + 1 * 10);
  });

  it("should throw type error", () => {
    const actions: any[] = [{ type: "unknown", count: 2 }];
    expect(() => calculateScore(actions)).toThrow(
      "invalid action type: unknown"
    );
  });

  it("should throw count error ", () => {
    const actions: any[] = [{ type: "login", count: -1 }];
    expect(() => calculateScore(actions)).toThrow("invalid count");
  });
});
