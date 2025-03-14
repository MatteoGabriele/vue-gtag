import purchase from "./purchase";
import query from "./query";

vi.mock("./query");

describe("purchase", () => {
  it("should use the purchase event", () => {
    purchase({
      transaction_id: "transaction_id_value",
    });

    expect(query).toHaveBeenCalledWith("event", "purchase", {
      transaction_id: "transaction_id_value",
    });
  });
});
