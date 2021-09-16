const { Sync } = require("../sync.model");

describe("sync model", () => {
  describe("schema", () => {
    test("status", () => {
      const { status } = Sync.schema.obj;
      expect(status).toEqual({
        type: String,
        required: true,
        enum: ["pending", "succeed", "failed"],
        default: "pending",
      });
    });

    test("operation", () => {
      const { operation } = Sync.schema.obj;
      expect(operation).toEqual({
        type: String,
      });
    });

    test("date", () => {
      const { date } = Sync.schema.obj;
      expect(date).toEqual({
        type: Date,
      });
    });
  });
});
