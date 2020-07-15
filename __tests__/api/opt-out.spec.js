import optOut from "@/api/opt-out";
import { getOptions } from "@/install";

jest.mock("@/install");

describe("api/opt-out", () => {
  it("should set disable to false", () => {
    getOptions.mockReturnValueOnce({
      config: { id: 1 },
    });

    optOut();

    expect(global["ga-disable-1"]).toBe(true);
  });
});
