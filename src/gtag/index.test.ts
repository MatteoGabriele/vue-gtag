import { useGtag } from "./index";

describe("gtag", () => {
  it("should return useGtag composable", () => {
    expect(useGtag()).toEqual({
      config: expect.any(Function),
      screenview: expect.any(Function),
      pageview: expect.any(Function),
      query: expect.any(Function),
      time: expect.any(Function),
      event: expect.any(Function),
      refund: expect.any(Function),
      purchase: expect.any(Function),
      linker: expect.any(Function),
    });
  });
});
