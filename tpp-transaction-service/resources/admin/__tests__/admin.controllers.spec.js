const request = require("supertest");

const server = require("../../../server");

describe("admin controllers", () => {
  let api;

  beforeAll(async () => {
    api = await request(server);
  });

  test("Admin #1 - should get server health successfully", async () => {
    // check server health
    const res = await api.get("/api/admin/health");

    expect(res.statusCode).toEqual(200);
  });

  test("Admin #2 - should get redirection status while getting server docs", async () => {
    // check server documentation
    const res = await api.get("/api/admin/documentation");

    expect(res.statusCode).toEqual(301);
  });
});
