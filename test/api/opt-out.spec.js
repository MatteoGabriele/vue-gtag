import optOut from "src/api/opt-out";
import disable from "src/api/disable";

jest.mock("src/api/disable");

describe("optOut", () => {
  test("turns off tracking", () => {
    optOut();
    expect(disable).toHaveBeenCalledWith(true);
  });
});
