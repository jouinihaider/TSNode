import Items from "../src/items";

describe("Items", function () {
  it("should return first item", function () {
    expect(Items.getFistItems()).toBe("Item1");
  });
});
