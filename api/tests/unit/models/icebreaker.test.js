const Icebreaker = require("../../../models/icebreaker");

describe("Icebreaker Model", () => {
  test("should have a valid schema", () => {
    const icebreaker = new Icebreaker({ icebreaker: "Test icebreaker" });
    expect(icebreaker.icebreaker).toBe("Test icebreaker");
  });

  test("should be invalid if required field is missing", () => {
    const icebreaker = new Icebreaker({});
    const err = icebreaker.validateSync();
    expect(err.errors.icebreaker).toBeDefined();
  });
});
