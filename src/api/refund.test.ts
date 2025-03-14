import query from "./query";
import refund from "./refund";

vi.mock("./query");

describe("refund", () => {
  it("should use the refund event", () => {
    refund({
      transaction_id: "transaction_id_value",
    });

    expect(query).toHaveBeenCalledWith("event", "refund", {
      transaction_id: "transaction_id_value",
    });
  });
});
