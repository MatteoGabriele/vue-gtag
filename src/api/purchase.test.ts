import purchase from "@/api/purchase";
import query from "@/api/query";

vi.mock("@/api/query");

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
