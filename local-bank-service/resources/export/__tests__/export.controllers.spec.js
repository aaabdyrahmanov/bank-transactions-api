const request = require("supertest");
const controllers = require("../export.controllers");

const server = require("../../../server");
const db = require("../../../utils/test.db");

describe("export controllers", () => {
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

  test("Export #1 - has crud controllers", () => {
    const crudMethods = ["transaction", "balance"];

    crudMethods.forEach((name) =>
      expect(typeof controllers[name]).toBe("function")
    );
  });

  test("Export Transaction #2 - should download transactions successfully", async () => {
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
        {
          id: "193e7ab4-9251-43fa-b852-8ea2b652920e",
          amount: 29245,
          counterpart_name: "Counterpart Name_2",
          counterpart_iban: "5a706a69-1fb9-4856-9649-17378ba23b68",
          date: "2020-10-19T20:28:10.000Z",
        },
      ],
    });

    // export transaction data
    const res = await api.get("/v1/export/transaction");

    const result = {
      status: res.statusCode,
      header: res.header["content-type"].split(" ")[0],
    };

    expect(result.status).toEqual(200);
    expect(result.header).toBe("text/csv;");
  });

  test("Export Transaction #3 - should fail with an empty store", async () => {
    const res = await api.get("/v1/export/transaction");

    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toEqual("failure");
  });

  test("Export Balance #4 - should download transactions successfully", async () => {
    // create new balances
    await api.post("/v1/balance").send({
      data: [
        { amount: 88124523, date: "2021-10-05T14:48:00.000Z" },
        { amount: 88124523, date: "2020-01-01T01:00:00.000Z" },
      ],
    });

    // export balance data
    const res = await api.get("/v1/export/balance");

    const result = {
      status: res.statusCode,
      header: res.header["content-type"].split(" ")[0],
    };

    expect(result.status).toEqual(200);
    expect(result.header).toBe("text/csv;");
  });

  test("Export Balance #5 - should fail with an empty store", async () => {
    const res = await api.get("/v1/export/balance");

    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toEqual("failure");
  });
});