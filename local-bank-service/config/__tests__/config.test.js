const config = require("..");

describe("config", () => {
  test("should load default values", () => {
    expect(config.HOST).not.toBeNull();
    expect(config.PORT).not.toBeNull();
    expect(config.TPP_SERVICE_URL).not.toBeNull();
    expect(config.DB_URL).not.toBeNull();
    expect(config.AMQP_URL).not.toBeNull();
    expect(config.AMQP_EXCHANGE).not.toBeNull();
    expect(config.AMQP_QUEUE).not.toBeNull();
    expect(config.AMQP_ROUTING_KEY).not.toBeNull();
    expect(config.EMAIL.SERVICE).not.toBeNull();
    expect(config.EMAIL.HOST).not.toBeNull();
    expect(config.EMAIL.USERNAME).not.toBeNull();
    expect(config.EMAIL.PASSWORD).not.toBeNull();
    expect(config.EMAIL.FROM).not.toBeNull();
    expect(config.EMAIL.TO).not.toBeNull();
  });
});
