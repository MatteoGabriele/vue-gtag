import * as plugin from "./index";

describe("index", () => {
  it("should have the following exports", () => {
    expect(plugin).toMatchInlineSnapshot(`
      {
        "addGtag": [Function],
        "config": [Function],
        "consent": [Function],
        "consentDeniedAll": [Function],
        "consentGrantedAll": [Function],
        "createGtag": [Function],
        "customMap": [Function],
        "ecommerce": [Function],
        "event": [Function],
        "exception": [Function],
        "linker": [Function],
        "optIn": [Function],
        "optOut": [Function],
        "pageview": [Function],
        "query": [Function],
        "screenview": [Function],
        "set": [Function],
        "time": [Function],
        "useConsent": [Function],
      }
    `);
  });
});
