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
    const res = await api.post("/v1/syncs/init");

    expect(res.statusCode).toEqual(201);
  });

  test("Sync #3 - should get data with lastTransactionId", async () => {
    const lastTransactionId = mongoose.Types.ObjectId();

    // launch sync
    const res = await api.post(
      `/v1/syncs/init?lastTransactionId=?${lastTransactionId}`
    );

    expect(res.statusCode).toEqual(201);
  });

  test("Sync #4 - should fail fetching with wrong date format", async () => {
    const lastDate = new Date();

    // launch sync
    const res = await api.post(`/v1/syncs/init?lastDate=${lastDate}`);

    expect(res.statusCode).toEqual(400);
  });

  test("Sync #5 - should fail with invalid ISO date format", async () => {
    const lastDate = "9999-88-77T66:55:44.000Z";

    const res = await api.post(`/v1/syncs/init?lastDate=${lastDate}`);

    expect(res.statusCode).toEqual(400);
  });

  test("Sync #6 - should fail with missing endpoint", async () => {
    const lastTransactionId = mongoose.Types.ObjectId();
    const lastDate = "2021-10-05T14:48:00.000Z";

    const res = await api.post(
      `/v1/syncs/init?lastTransactionId=?${lastTransactionId}?lastDate=${lastDate}`
    );

    expect(res.statusCode).toEqual(201);
  });

  test("Sync #7 - should delete the data", async () => {
    const res = await api.delete("/v1/syncs");

    expect(res.statusCode).toEqual(404);
  });

  test("Sync #8 - should terminate the launched synchronization - succeed", async () => {
    // launch sync
    const newSync = await api.post("/v1/syncs/init");
    
    // terminate launched sync
    const res = await api.post("/v1/syncs/terminate").send({
      id: newSync.body.data.id,
      status: "succeed",
      date: "2021-08-23T08:21:31.287Z",
      data: [
        {
          transactions: [
            {
              id: "23de04c0-f764-4c94-9356-86fe1e6acd19",
              amount: 86060,
              counterpart_name: "Counterpart Name_1",
              counterpart_iban: "691f9dd4-d736-4e99-a210-fd4697561982",
              date: "Mon Aug 30 2021 17:22:52 GMT+0300 (GMT+03:00)",
            },
          ],
        },
        {
          balances: [
            {
              amount: 26148,
              date: "2019-10-05T14:48:00.000Z",
            },
            {
              amount: 41589,
              date: "2021-10-05T14:48:00.000Z",
            },
          ],
        },
      ],
    });

    // test response data equality
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.status).toEqual("succeed");
    expect(res.body.data._id).toBeDefined();
    expect(res.body.data.date).toBeDefined();
    expect(res.body.data.createdAt).toBeDefined();
    expect(res.body.data.updatedAt).toBeDefined();
    
    // test response data types
    expect(typeof res.body.status).toBe("string");
    expect(typeof res.body.data).toBe("object");
    expect(typeof res.body.data.status).toBe("string");
    expect(typeof res.body.data._id).toBe("string");
    expect(typeof res.body.data.date).toBe("string");
    expect(typeof res.body.data.createdAt).toBe("string");
    expect(typeof res.body.data.updatedAt).toBe("string");
  });

  test("Sync #9 - should terminate the launched synchronization - failed", async () => {
    // launch sync
    const newSync = await api.post("/v1/syncs/init");

    // terminate launched sync
    const res = await api.post("/v1/syncs/terminate").send({
      id: newSync.body.data.id,
      status: "failed",
      date: "2021-08-23T08:21:31.287Z",
      data: [
        {
          transactions: [
            {
              id: "23de04c0-f764-4c94-9356-86fe1e6acd19",
              amount: 86060,
              counterpart_name: "Counterpart Name_1",
              counterpart_iban: "691f9dd4-d736-4e99-a210-fd4697561982",
              date: "Mon Aug 30 2021 17:22:52 GMT+0300 (GMT+03:00)",
            },
          ],
        },
        {
          balances: [
            {
              amount: 26148,
              date: "2019-10-05T14:48:00.000Z",
            },
            {
              amount: 41589,
              date: "2021-10-05T14:48:00.000Z",
            },
          ],
        },
      ],
    });

    // test response data equality
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.status).toEqual("failed");
    expect(res.body.data._id).toBeDefined();
    expect(res.body.data.date).toBeDefined();
    expect(res.body.data.createdAt).toBeDefined();
    expect(res.body.data.updatedAt).toBeDefined();
    
    // test response data types
    expect(typeof res.body.status).toBe("string");
    expect(typeof res.body.data).toBe("object");
    expect(typeof res.body.data.status).toBe("string");
    expect(typeof res.body.data._id).toBe("string");
    expect(typeof res.body.data.date).toBe("string");
    expect(typeof res.body.data.createdAt).toBe("string");
    expect(typeof res.body.data.updatedAt).toBe("string");
  });

  // success
  test("Sync #10 - should fail to terminate the launched synchronization - missing transactions data", async () => {
    // launch sync
    const newSync = await api.post("/v1/syncs/init");

    // terminate launched sync
    const res = await api.post("/v1/syncs/terminate").send({
      id: newSync.body.data.id,
      status: "succeed",
      date: "2021-08-23T08:21:31.287Z",
      data: [
        {
          balances: [
            {
              amount: 26148,
              date: "2019-10-05T14:48:00.000Z",
            },
            {
              amount: 41589,
              date: "2021-10-05T14:48:00.000Z",
            },
          ],
        },
      ],
    });

    expect(res.statusCode).toEqual(400);
  });

  test("Sync #11 - should fail to terminate the launched synchronization - invalid balances data", async () => {
    // launch sync
    const newSync = await api.post("/v1/syncs/init");

    // terminate launched sync
    const res = await api.post("/v1/syncs/terminate").send({
      id: newSync.body.data.id,
      status: "succeed",
      date: "2021-08-23T08:21:31.287Z",
      data: [
        {
          balances: [
            {
              id: "23de04c0-f764-4c94-9356-86fe1e6acd19",
              counterpart_name: "Counterpart Name_1",
              counterpart_iban: "691f9dd4-d736-4e99-a210-fd4697561982",
            },
          ],
        },
      ],
    });

    expect(res.statusCode).toEqual(400);
  });

  test("Sync #12 - should terminate the synchronization successfuly - with missing balances data", async () => {
    // launch sync
    const newSync = await api.post("/v1/syncs/init");

    // terminate launched sync
    const res = await api.post("/v1/syncs/terminate").send({
      id: newSync.body.data.id,
      status: "succeed",
      date: "2021-08-23T08:21:31.287Z",
      data: [
        {
          transactions: [
            {
              id: "23de04c0-f764-4c94-9356-86fe1e6acd19",
              amount: 86060,
              counterpart_name: "Counterpart Name_1",
              counterpart_iban: "691f9dd4-d736-4e99-a210-fd4697561982",
              date: "Mon Aug 30 2021 17:22:52 GMT+0300 (GMT+03:00)",
            },
          ],
        },
      ],
    });

    expect(res.statusCode).toEqual(400);
  });

  // invalid rejected status
  test("Sync #13 - should fail to terminate the launched synchronization - invalid sync status", async () => {
    // launch sync
    const newSync = await api.post("/v1/syncs/init");

    // terminate launched sync
    const res = await api.post("/v1/syncs/terminate").send({
      id: newSync.body.data.id,
      status: "rejected",
      date: "2021-08-25T10:51:14.187Z",
      data: [
        {
          transactions: {
            status: "technicalFailure",
            data: "The bank failed to return the transactions.",
          },
        },
        {
          balances: [
            {
              amount: 26148,
              date: "2019-10-05T14:48:00.000Z",
            },
            {
              amount: 41589,
              date: "2021-10-05T14:48:00.000Z",
            },
          ],
        },
      ],
    });

    expect(res.statusCode).toEqual(404);
  });
});
