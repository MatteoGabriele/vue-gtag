import { query } from "@/api/query";
import { resetSettings, updateSettings } from "@/core/settings";
import { type Router, createRouter, createWebHistory } from "vue-router";
import { pageview } from "./pageview";

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

  describe("pageTracker enabled", () => {
    beforeEach(() => {
      updateSettings({
        pageTracker: { router },
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
