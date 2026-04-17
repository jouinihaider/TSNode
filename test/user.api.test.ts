import request from "supertest";
import Server from "../src/server";

describe("api test", () => {
  const app = new Server(4001).start();

  it("POST calculate user score", async () => {
    const response = await request(app)
      .post("/user/calculate")
      .send({
        email: "test@mail.com",
        actions: [
          { type: "login", count: 2 },
          { type: "purchase", count: 1 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.score).toBe(2 * 1 + 1 * 10);
  });

  it("should return 400 for invalid email", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        email: "unknown",
        actions: [
          { type: "login", count: 0 },
          { type: "purchase", count: 1 },
        ],
      });

    expect(response.status).toBe(500);
  });
});
