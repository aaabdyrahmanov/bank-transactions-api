const { Transaction } = require("../transaction.model");

describe("transaction model", () => {
  describe("schema", () => {
    test("id", () => {
      const { id } = Transaction.schema.obj;
      expect(id).toEqual({
        type: String,
        required: true,
      });
    });

    test("amount", () => {
      const { amount } = Transaction.schema.obj;
      expect(amount).toEqual({
        type: Number,
        required: true,
      });
    });

    test("counterpart_name", () => {
      const { counterpart_name } = Transaction.schema.obj;
      expect(counterpart_name).toEqual({
        type: String,
        required: true,
      });
    });

    test("counterpart_iban", () => {
      const { counterpart_iban } = Transaction.schema.obj;
      expect(counterpart_iban).toEqual({
        type: String,
        required: true,
      });
    });

    test("date", () => {
      const { date } = Transaction.schema.obj;
      expect(date).toEqual({
        type: Date,
        required: true,
      });
    });
  });
});
