import disable from "@/api/disable";
import optOut from "@/api/opt-out";

vi.mock("@/api/disable");

describe("optOut", () => {
  test("turns off tracking", () => {
    optOut();
    expect(disable).toHaveBeenCalledWith(true);
  });
});
