import query from "@/api/query";
import refund from "@/api/refund";

vi.mock("@/api/query");

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
