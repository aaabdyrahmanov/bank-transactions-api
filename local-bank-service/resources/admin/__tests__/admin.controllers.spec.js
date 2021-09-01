const request = require("supertest");

const server = require("../../../server");

describe("admin controllers", () => {
  let api;

  beforeAll(async () => {
    api = await request(server);
  });

  test("Admin #1 - should check server health and get successful result", async () => {
    // check server health
    const res = await api.get("/v1/admin/health").send();

    expect(res.statusCode).toEqual(200);
  });

  test("Admin #2 - should clear redis cache successfully", async () => {
    // clear redis cache
    const res = await api.delete("/v1/admin/cache").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Data cleared successully!');
  });
});
