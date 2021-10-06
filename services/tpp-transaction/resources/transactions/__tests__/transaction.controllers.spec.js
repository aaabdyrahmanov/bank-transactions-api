const request = require("supertest");
const controllers = require("../transaction.controllers");

const server = require("../../../server");
const db = require("../../../utils/test.db");

describe("transactions controllers", () => {
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

  test("Transactions #1 - has getMany controller", () => {
    const crudMethods = ["getMany"];

    crudMethods.forEach((name) =>
      expect(typeof controllers[name]).toBe("function")
    );
  });

  test("Transactions #2 - should get transactions successfully", async () => {
    // get transactions
    const res = await api.get("/api/transactions");

    expect(res.statusCode).toEqual(200);
  });
});

describe("transactions controllers - throws an error on missing db setup", () => {
  let api;
  beforeAll(async () => {
    // start the server
    api = await request(server);
  });

  test("Transactions #3 - should fail while getting transactions", async () => {
    // get transactions
    const res = await api.get("/api/transactions");

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual("failure");
    expect(res.body.message).toBeDefined();
  });
});
