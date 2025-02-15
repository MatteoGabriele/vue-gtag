import disable from "@/api/disable";
import optIn from "@/api/opt-in";

vi.mock("@/api/disable");

describe("optIn", () => {
  test("turns on tracking", () => {
    optIn();
    expect(disable).toHaveBeenCalledWith(false);
  });
});
