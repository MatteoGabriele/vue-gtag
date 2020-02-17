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

  it("should set false to includes domains", () => {
    getOptions.mockReturnValueOnce({
      config: { id: 1 },
      includes: [{ id: 2 }, { id: 3 }]
    });

    disable(false);

    expect(global["ga-disable-2"]).toBe(false);
    expect(global["ga-disable-3"]).toBe(false);
  });
});
