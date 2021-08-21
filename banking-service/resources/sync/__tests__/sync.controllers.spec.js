const mongoose = require("mongoose");
const request = require("supertest");
const controllers = require("../sync.controllers");

const server = require("../../../server");
const db = require("../../../utils/test.db");

describe("sync controllers", () => {
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

  test("Sync #1 - has crud controllers", () => {
    const crudMethods = ["getMany", "createMany", "removeMany"];

    crudMethods.forEach((name) =>
      expect(typeof controllers[name]).toBe("function")
    );
  });

  test("Sync #2 - should download transactions successfully", async () => {
    // launch sync
    const res = await api.get("/v1/sync/launch");

    expect(res.statusCode).toEqual(201);
  });

  test("Sync #3 - should get data with lastTransactionId", async () => {
    const lastTransactionId = mongoose.Types.ObjectId();

    // launch sync
    const res = await api.get(
      `/v1/sync/launch?lastTransactionId=?${lastTransactionId}`
    );

    expect(res.statusCode).toEqual(201);
  });

  test("Sync #4 - should fail fetching with wrong date format", async () => {
    const lastDate = new Date();

    // launch sync
    const res = await api.get(`/v1/sync/launch?lastDate=${lastDate}`);

    expect(res.statusCode).toEqual(400);
  });

  test("Sync #5 - should fail with invalid ISO date format", async () => {
    const lastDate = "9999-88-77T66:55:44.000Z";

    const res = await api.get(`/v1/sync/launch?lastDate=${lastDate}`);

    expect(res.statusCode).toEqual(400);
  });

  test("Sync #6 - should fail with missing endpoint", async () => {
    const lastTransactionId = mongoose.Types.ObjectId();
    const lastDate = "2021-10-05T14:48:00.000Z";

    const res = await api.get(
      `/v1/sync/launch?lastTransactionId=?${lastTransactionId}?lastDate=${lastDate}`
    );

    expect(res.statusCode).toEqual(201);
  });

  test("Sync #7 - should delete the data", async () => {
    const res = await api.delete("/v1/sync");

    expect(res.statusCode).toEqual(404);
  });
});
