import { query } from "@/api/query";
import { ecommerce } from "./ecommerce";

vi.mock("@/api/query");

describe("ecommerce", () => {
  it("should use the ecommerce event", () => {
    ecommerce("refund", {
      transaction_id: "transaction_id_value",
    });

    expect(query).toHaveBeenCalledWith("event", "refund", {
      transaction_id: "transaction_id_value",
    });
  });
});
