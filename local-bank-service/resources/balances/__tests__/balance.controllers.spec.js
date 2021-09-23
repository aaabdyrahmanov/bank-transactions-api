const request = require("supertest");
const controllers = require("../balance.controllers");

const server = require("../../../server");
const db = require("../../../utils/test.db");

describe("balance controllers", () => {
  let api;
  // Setup connection to the database
  beforeAll(async () => {
    await db.connect();
    api = await request(server);
  });

  afterEach(() => db.clear());

  afterAll(async () => {
    await db.close();
  });

  test("Balance #1 - has crud controllers", () => {
    const crudMethods = ["getMany", "createMany", "removeMany"];

    crudMethods.forEach((name) =>
      expect(typeof controllers[name]).toBe("function")
    );
  });

  test("Balance #2 - should fail new balances creation with missing body", async () => {
    // create new balances
    const res = await api.post("/v1/balances").send();

    expect(res.statusCode).toEqual(400);
  });

  test("Balance #3 - should create new balances successfully", async () => {
    // create new balances
    const res = await api.post("/v1/balances").send({
      data: [
        { amount: 924178, date: "2021-10-05T14:48:00.000Z" },
        { amount: 401274, date: "2020-01-01T01:00:00.000Z" },
      ],
    });

    expect(res.statusCode).toEqual(201);
  });

  test("Balance #4 - should get balances successfully", async () => {
    // create new balances
    await api.post("/v1/balances").send({
      data: [
        { amount: 88124523, date: "2021-10-05T14:48:00.000Z" },
        { amount: 88124523, date: "2020-01-01T01:00:00.000Z" },
      ],
    });

    // get balances
    const res = await api.get("/v1/balances");

    expect(res.statusCode).toEqual(200);
  });

  test("Balance #5 - should fail to get balances with missing pagination", async () => {
    // get nonexistent balance data
    const res = await api.get("/v1/balances?limit=80&page=23");

    expect(res.statusCode).toEqual(404);
  });

  test("Balance #6 - should remove balances data", async () => {
    // create new balances
    await api.post("/v1/balances").send({
      data: [
        { amount: 88124523, date: "2021-10-05T14:48:00.000Z" },
        { amount: 88124523, date: "2020-01-01T01:00:00.000Z" },
      ],
    });

    // remove balances
    const res = await api.delete("/v1/balances");

    expect(res.statusCode).toEqual(200);
  });

  test("Balance #7 - should fail to remove balances data", async () => {
    // remove balances
    const res = await api.delete("/v1/balances");

    expect(res.statusCode).toEqual(404);
  });
});

describe("balance controllers - throws error on missing database setup", () => {
  let api;

  beforeAll(async () => {
    // start the server
    api = await request(server);
  });

  test("Balance #8 - should fail to create new balances", async () => {
    // create new balances
    const res = await api.post("/v1/balances").send({
      data: [
        { amount: 924178, date: "2021-10-05T14:48:00.000Z" },
        { amount: 401274, date: "2020-01-01T01:00:00.000Z" },
      ],
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual("failure");
    expect(res.body.message).toBeDefined();
  });

  test("Balance #9 - should fail to get balances data", async () => {
    // get balances
    const res = await api.get("/v1/balances");

    expect(res.statusCode).toEqual(400);
  });

  test("Balance #10 - should fail to remove balances data", async () => {
    // remove balances
    const res = await api.delete("/v1/balances");

    expect(res.statusCode).toEqual(400);
  });
});
