const request = require("supertest");

const server = require("../server");

describe("export controllers", () => {
  test("Server - should fail with missing endpoints", async () => {
    expect.assertions(3);

    let response = await request(server).get("/v1/initialize");
    expect(response.statusCode).toBe(404);

    response = await request(server).get("/v1/balance");
    expect(response.statusCode).toBe(404);

    response = await request(server).get("/api");
    expect(response.statusCode).toBe(404);
  });
});
