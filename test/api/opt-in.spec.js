import optIn from "src/api/opt-in";
import disable from "src/api/disable";

jest.mock("src/api/disable");

describe("optIn", () => {
  test("turns on tracking", () => {
    optIn();
    expect(disable).toHaveBeenCalledWith(false);
  });
});
