import optOut from "@/api/opt-out";
import disable from "@/api/disable";

jest.mock("@/api/disable");

describe("optOut", () => {
  test("turns off tracking", () => {
    optOut();
    expect(disable).toHaveBeenCalledWith(true);
  });
});
