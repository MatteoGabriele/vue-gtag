import optIn from "@/api/opt-in";
import { getOptions } from "@/install";

jest.mock("@/install");

describe("api/opt-in", () => {
  it("should set disable to false", () => {
    getOptions.mockReturnValueOnce({
      config: { id: 1 },
    });

    optIn();

    expect(global["ga-disable-1"]).toBe(false);
  });
});
