import flushPromises from "flush-promises";
import * as utils from "./utils";

const defaultUrl = "https://www.googletagmanager.com/gtag/js?id=12345678";

describe("utils", () => {
  describe("injectScript", () => {
    afterEach(() => {
      document.getElementsByTagName("html")[0].innerHTML = "";
    });

    it("should create a script tag", async () => {
      utils.injectScript(defaultUrl);

      await flushPromises();

      const scripts = document.getElementsByTagName("script");

      expect(scripts.length).toEqual(1);
      expect(scripts[0].getAttribute("src")).toEqual(defaultUrl);
      expect(scripts[0].defer).toEqual(false);
      expect(scripts[0].getAttribute("type")).toEqual("text/javascript");
    });

    it("should create a script tag with the defer attribute", async () => {
      utils.injectScript(defaultUrl, {
        defer: true,
      });

      await flushPromises();

      const scripts = document.getElementsByTagName("script");

      expect(scripts[0].defer).toEqual(true);
    });

    it("should create a link for domain preconnect", async () => {
      utils.injectScript(defaultUrl, {
        preconnect: true,
      });

      await flushPromises();

      const links = document.getElementsByTagName("link");

      expect(links[0].getAttribute("href")).toEqual(
        "https://www.googletagmanager.com",
      );
      expect(links[0].getAttribute("rel")).toEqual("preconnect");
    });

    it("should accept the nonce attribute", async () => {
      utils.injectScript(defaultUrl, {
        nonce: "abcd",
      });

      await flushPromises();

      const scripts = document.getElementsByTagName("script");

      expect(scripts[0].getAttribute("nonce")).toEqual("abcd");
    });

    it("should add a custom type", async () => {
      utils.injectScript(defaultUrl, {
        type: "text/partytown",
      });

      await flushPromises();

      const scripts = document.getElementsByTagName("script");

      expect(scripts[0].getAttribute("type")).toEqual("text/partytown");
    });
  });

  describe("urlQueryReplace", () => {
    const originalLocation = window.location;
    const originalHistory = window.history;

    beforeEach(() => {
      Object.defineProperty(window, "location", {
        value: {
          ...originalLocation,
          href: "https://example.com/page?oldParam=value&utm_source=test",
        },
        writable: true,
      });

      // Mock window.history.replaceState
      window.history.replaceState = vi.fn();
    });

    afterEach(() => {
      // Restore window.location
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
      window.history.replaceState = originalHistory.replaceState;
    });

    it("should replace URL query parameters without page refresh", () => {
      const newQueryParams = {
        newParam: "newValue",
        anotherParam: "anotherValue",
      };

      utils.urlQueryReplace(newQueryParams);

      // Check if history.replaceState was called correctly
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        "",
        "https://example.com/page?newParam=newValue&anotherParam=anotherValue",
      );
    });

    it("should clear all existing query parameters", () => {
      utils.urlQueryReplace({});

      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        "",
        "https://example.com/page",
      );
    });

    it("should handle empty parameters", () => {
      utils.urlQueryReplace({ param: "" });

      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        "",
        "https://example.com/page?param=",
      );
    });
  });
});
