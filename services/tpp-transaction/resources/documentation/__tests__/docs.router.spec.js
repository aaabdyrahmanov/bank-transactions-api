const request = require("supertest");

const server = require("../../../server");

describe("documentation controllers", () => {
  let api;

  beforeAll(async () => {
    api = await request(server);
  });

  test("Docs #1 - should get redirection status while getting server docs", async () => {
    // check server documentation
    const res = await api.get("/api/documentation");

    expect(res.statusCode).toEqual(301);
  });
});
