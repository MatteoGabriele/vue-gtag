import flushPromises from "flush-promises";
import * as utils from "./utils";

describe("utils", () => {
  describe("injectScript", () => {
    afterEach(() => {
      document.getElementsByTagName("html")[0].innerHTML = "";
    });

    it("should create a script tag", async () => {
      utils.injectScript("foo");

      await flushPromises();

      const scripts = document.getElementsByTagName("script");

      expect(scripts.length).toEqual(1);
      expect(scripts[0].getAttribute("src")).toEqual("foo");
      expect(scripts[0].defer).toEqual(false);
    });

    it("should create a script tag with the defer attribute", async () => {
      utils.injectScript("foo", {
        defer: true,
      });

      await flushPromises();

      const scripts = document.getElementsByTagName("script");

      expect(scripts[0].defer).toEqual(true);
    });

    it("should create a link for domain preconnect", async () => {
      utils.injectScript("https://www.google.com/something", {
        preconnectOrigin: true,
      });

      await flushPromises();

      const links = document.getElementsByTagName("link");

      expect(links[0].getAttribute("href")).toEqual("https://www.google.com");
      expect(links[0].getAttribute("rel")).toEqual("preconnect");
    });
  });
});
