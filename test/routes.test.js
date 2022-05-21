import request from "supertest";

import { app } from "../src/index.js";

describe("GET /users/:id", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/users/1?at=2020-03-18T00:00:00Z")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

describe("PATCH /users/1/rewards/{date}/redeem", () => {
  it("responds with json", (done) => {
    request(app)
      .patch("/users/1/rewards/2020-03-18T00:00:00Z/redeem")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});
