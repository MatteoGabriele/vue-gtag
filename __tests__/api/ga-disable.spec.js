import { getOptions } from "@/install";
import disable from "@/api/ga-disable";

jest.mock("@/install");

describe("ga-disable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set true", () => {
    getOptions.mockReturnValueOnce({
      config: { id: 1 }
    });

    disable();

    expect(global["ga-disable-1"]).toBe(true);
  });

  it("should set false", () => {
    getOptions.mockReturnValueOnce({
      config: { id: 1 }
    });

    disable(false);

    expect(global["ga-disable-1"]).toBe(false);
  });
});
