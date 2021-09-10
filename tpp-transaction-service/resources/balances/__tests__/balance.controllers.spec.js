const request = require("supertest");
const controllers = require("../balance.controllers");

const server = require("../../../server");
const db = require("../../../utils/test.db");

describe("balances controllers", () => {
  let api;

  beforeAll(async () => {
    // setup connection to the database
    await db.connect();
    api = await request(server);
  });

  afterEach(() => db.clear());

  afterAll(async () => {
    await db.close();
  });

  test("Balances #1 - has getMany controller", () => {
    const crudMethods = ["getMany"];

    crudMethods.forEach((name) =>
      expect(typeof controllers[name]).toBe("function")
    );
  });

  test("Balances #2 - should get balances successfully", async () => {
    // get balances
    const res = await api.get("/api/balances");

    expect(res.statusCode).toEqual(200);
  });
});

describe("balances controllers - throws an error on missing db setup", () => {
  let api;
  beforeAll(async () => {
    // start the server
    api = await request(server);
  });

  test("Balances #3 - should fail while getting balances", async () => {
    // get balances
    const res = await api.get("/api/balances");

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual("failure");
    expect(res.body.message).toBeDefined();
  });
});
