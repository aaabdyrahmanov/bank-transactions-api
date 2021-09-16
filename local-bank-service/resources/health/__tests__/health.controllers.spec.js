const request = require("supertest");

const server = require("../../../server");

describe("health controller", () => {
  let api;

  beforeAll(async () => {
    api = await request(server);
  });

  test("Health #1 - should check server health and get successful result", async () => {
    // check server health
    const res = await api.get("/v1/health").send();

    expect(res.statusCode).toEqual(200);
  });
});
