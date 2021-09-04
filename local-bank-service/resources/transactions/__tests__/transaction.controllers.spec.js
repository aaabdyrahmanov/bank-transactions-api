const request = require("supertest");
const controllers = require("../transaction.controllers");

const server = require("../../../server");
const db = require("../../../utils/test.db");

describe("transaction controllers", () => {
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

  test("Transaction #1 - has crud controllers", () => {
    const crudMethods = ["getMany", "createMany", "removeMany"];

    crudMethods.forEach((name) =>
      expect(typeof controllers[name]).toBe("function")
    );
  });

  test("Balance #2 - should fail new transactions creation with missing body", async () => {
    // create new transactions
    const res = await api.post("/v1/transaction").send();

    expect(res.statusCode).toEqual(400);
  });

  test("Transaction #3 - should create new transactions successfully", async () => {
    // create new transactions
    const res = await api.post("/v1/transaction").send({
      data: [
        {
          id: "193e7ab4-9251-43fa-b852-8ea2b652920e",
          amount: 29245,
          counterpart_name: "Counterpart Name_1",
          counterpart_iban: "5a706a69-1fb9-4856-9649-17378ba23b68",
          date: "2020-10-19T20:28:10.000Z",
        },
      ],
    });

    expect(res.statusCode).toEqual(201);
  });

  test("Transaction #4 - should get transactions successfully", async () => {
    // create new balances
    await api.post("/v1/transaction").send({
      data: [
        {
          id: "193e7ab4-9251-43fa-b852-8ea2b652920e",
          amount: 29245,
          counterpart_name: "Counterpart Name_1",
          counterpart_iban: "5a706a69-1fb9-4856-9649-17378ba23b68",
          date: "2020-10-19T20:28:10.000Z",
        },
      ],
    });

    // get transactions
    const res = await api.get("/v1/transaction");

    expect(res.statusCode).toEqual(200);
  });

  test("Transaction #5 - should fail to get transactions with missing pagination", async () => {
    // get nonexistent transaction data
    const res = await api.get("/v1/transaction?limit=80&page=23");

    expect(res.statusCode).toEqual(404);
  });

  test("Transaction #6 - should remove transactions data", async () => {
    // create new transactions
    await api.post("/v1/transaction").send({
      data: [
        {
          id: "193e7ab4-9251-43fa-b852-8ea2b652920e",
          amount: 29245,
          counterpart_name: "Counterpart Name_1",
          counterpart_iban: "5a706a69-1fb9-4856-9649-17378ba23b68",
          date: "2020-10-19T20:28:10.000Z",
        },
      ],
    });

    // remove balances
    const res = await api.delete("/v1/transaction");

    expect(res.statusCode).toEqual(200);
  });

  test("Transaction #7 - should fail to remove transactions data", async () => {
    // remove transactions
    const res = await api.delete("/v1/transaction");

    expect(res.statusCode).toEqual(404);
  });
});
