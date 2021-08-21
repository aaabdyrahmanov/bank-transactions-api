const { Balance } = require("../balance.model");

describe("balance model", () => {
  describe("schema", () => {
    test("amount", () => {
      const { amount } = Balance.schema.obj;
      expect(amount).toEqual({
        type: Number,
        required: true,
      });
    });

    test("date", () => {
      const { date } = Balance.schema.obj;
      expect(date).toEqual({
        type: Date,
        required: true,
      });
    });
  });
});
