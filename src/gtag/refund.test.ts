import query from "@/gtag/query";
import refund from "@/gtag/refund";

vi.mock("@/gtag/query");

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
