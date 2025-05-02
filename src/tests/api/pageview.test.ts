import { pageview } from "@/api/pageview";
import { query } from "@/api/query";
import { resetSettings, updateSettings } from "@/core/settings";
import { type Router, createRouter, createWebHistory } from "vue-router";

vi.mock("@/api/query");

describe("pageview", () => {
  let router: Router;

  beforeEach(async () => {
    resetSettings();

    router = createRouter({
      history: createWebHistory("/base-path"),
      routes: [
        { path: "/about", name: "about", component: { template: "<div />" } },
      ],
    });

    vi.spyOn(router, "isReady").mockResolvedValue();
    vi.spyOn(router, "replace");

    await router.isReady();
    await router.push({ name: "about", query: { id: 1 }, hash: "#title" });
  });

  it("should track a page path", async () => {
    pageview("/about");

    expect(query).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/about",
      }),
    );
  });

  it("should track a page path using a route", async () => {
    pageview(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/about",
      }),
    );
  });

  it("should add the page_location property by default", async () => {
    pageview("/about");

    expect(query).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_location: "http://localhost:3000/base-path/about?id=1#title",
      }),
    );
  });

  it("should add the send_page_view property by default", async () => {
    pageview("/about");

    expect(query).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        send_page_view: true,
      }),
    );
  });

  it("should track a page title using a route", async () => {
    pageview(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_title: "about",
      }),
    );
  });

  it("should use custom parameters", async () => {
    pageview({
      page_path: "/about",
      page_location: "custom_page_location",
      send_page_view: false,
    });

    expect(query).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/about",
      page_location: "custom_page_location",
      send_page_view: false,
    });
  });

  it("should track url with a consistent shape", () => {
    pageview("/about");
    pageview("/about/");

    expect(query).toHaveBeenNthCalledWith(
      1,
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/about",
      }),
    );
    expect(query).toHaveBeenNthCalledWith(
      2,
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/about",
      }),
    );
  });

  it("should send utm parameters within the page_view event", () => {
    const pageLocation =
      "http://localhost:3000/?foo=1&utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&bar=2";

    pageview({
      page_path: "/",
      page_location: pageLocation,
    });

    expect(query).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/",
        page_location: pageLocation,
      }),
    );
  });

  it("should send utm parameters manually with custom set command", () => {
    updateSettings({
      useUtmTracking: true,
    });

    pageview({
      page_path: "/",
      page_location:
        "http://localhost:3000/?foo=1&utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&bar=2",
    });

    expect(query).toHaveBeenNthCalledWith(1, "set", "campaign", {
      source: "google",
      medium: "cpc",
      id: "summer_sale",
    });

    expect(query).toHaveBeenNthCalledWith(
      2,
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/",
        page_location: "http://localhost:3000/?foo=1&bar=2",
      }),
    );
  });

  describe("pageTracker enabled", () => {
    beforeEach(() => {
      updateSettings({
        pageTracker: { router },
      });
    });

    it("should clear the query from utm params", async () => {
      updateSettings({
        useUtmTracking: true,
        pageTracker: { router },
      });

      await router.push({
        query: {
          foo: "2",
          utm_source: "google",
          utm_medium: "cpc",
          utm_campaign: "summer_sale",
          bar: "2",
        },
      });

      pageview(router.currentRoute.value);

      expect(router.replace).toHaveBeenCalledWith({
        query: {
          foo: "2",
          bar: "2",
        },
      });
    });

    it("should track a page path using a route", () => {
      pageview(router.currentRoute.value);

      expect(query).toHaveBeenCalledWith(
        "event",
        "page_view",
        expect.objectContaining({
          page_path: "/about",
        }),
      );
    });

    it("should track a page full path using a route", async () => {
      updateSettings({
        pageTracker: {
          router,
          useRouteFullPath: true,
        },
      });

      pageview(router.currentRoute.value);

      expect(query).toHaveBeenCalledWith(
        "event",
        "page_view",
        expect.objectContaining({
          page_path: "/about?id=1#title",
        }),
      );
    });

    it("should track a page path with base using a route", async () => {
      updateSettings({
        pageTracker: {
          router,
          useRouterBasePath: true,
        },
      });

      pageview(router.currentRoute.value);

      expect(query).toHaveBeenCalledWith(
        "event",
        "page_view",
        expect.objectContaining({
          page_path: "/base-path/about",
        }),
      );
    });

    it("should change the default send_page_view value", async () => {
      updateSettings({
        pageTracker: {
          router,
          sendPageView: false,
        },
      });

      pageview(router.currentRoute.value);

      expect(query).toHaveBeenCalledWith(
        "event",
        "page_view",
        expect.objectContaining({
          send_page_view: false,
        }),
      );
    });
  });
});
