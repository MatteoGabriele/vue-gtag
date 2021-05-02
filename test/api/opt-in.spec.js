import optIn from "@/api/opt-in";
import disable from "@/api/disable";

jest.mock("@/api/disable");

describe("optIn", () => {
  test("turns on tracking", () => {
    optIn();
    expect(disable).toHaveBeenCalledWith(false);
  });
});
