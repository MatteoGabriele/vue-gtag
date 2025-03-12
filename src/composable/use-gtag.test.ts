import useGtag from "./use-gtag";

describe("gtag", () => {
  it("should return useGtag composable", () => {
    expect(useGtag()).toMatchInlineSnapshot(`
      {
        "config": [Function],
        "customMap": [Function],
        "event": [Function],
        "exception": [Function],
        "linker": [Function],
        "pageview": [Function],
        "purchase": [Function],
        "query": [Function],
        "refund": [Function],
        "screenview": [Function],
        "set": [Function],
        "time": [Function],
      }
    `);
  });
});
