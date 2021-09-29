const request = require("supertest");

const server = require("../../../server");

describe("health controllers", () => {
  let api;

  beforeAll(async () => {
    api = await request(server);
  });

  test("Health #1 - should get server health successfully", async () => {
    // check server health
    const res = await api.get("/api/health");

    expect(res.statusCode).toEqual(200);
  });
});
