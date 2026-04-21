import request from "supertest";
import Server from "../src/server";

describe("test unitaires", () => {
  const app = new Server().start();

  //   it("check order calcaulte", () => {
  //     const order = {};
  //     expect(order).toBe("1234");
  //   });

  it("test api", async () => {
    // const result = await request(app).get("/user");
    // expect(result.status).toBe(200);
  });
});
