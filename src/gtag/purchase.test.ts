import purchase from "@/gtag/purchase";
import query from "@/gtag/query";

vi.mock("@/gtag/query");

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
