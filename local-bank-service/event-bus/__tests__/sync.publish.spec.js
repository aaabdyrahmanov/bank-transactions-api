const { publish } = require("..");

describe("Message Broker Connection", () => {
  test("AMQP Connection #1 - Should fail to connectn on amqp", async () =>
    publish().catch((err) => {
      expect(err).toBeDefined();
      expect(err.message.startsWith("Error Listening to URL ")).toBeTruthy();
    }));
});
