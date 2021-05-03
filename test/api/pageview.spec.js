import { createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import VueGtag from "@/index";
import pageview from "@/api/pageview";
import event from "@/api/event";
import flushPromises from "flush-promises";

jest.mock("@/api/event");

describe("pageview", () => {
  const _window = window;
  const { location } = window;

  beforeAll(() => {
    delete window.location;

    window.location = {
      href: "window_location_href_value",
    };
  });

  beforeEach(() => {
    global.window = _window;
  });

  afterAll(() => {
    window.location = location;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("pass a page as string", () => {
    pageview("/");

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_path: "/",
      page_location: "window_location_href_value",
    });
  });

  test("pass page as an object", () => {
    pageview({
      page_path: "/about",
      page_title: "about",
      page_location: "window_location_href_value",
    });

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "about",
      page_path: "/about",
      page_location: "window_location_href_value",
    });
  });

  test("pass page as a route", async () => {
    const localVue = createLocalVue();
    const router = new VueRouter({
      mode: "abstract",
      routes: [{ name: "home", path: "/" }],
    });

    localVue.use(VueRouter);

    router.push("/");

    await flushPromises();

    pageview(router.currentRoute);

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "home",
      page_path: "/",
      page_location: "window_location_href_value",
    });
  });

  test("track pageview without window", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: { id: 1 },
    });

    delete global.window;

    expect(() => {
      pageview("/");
    }).not.toThrow();
  });

  describe("pageTrackerUseFullPath", () => {
    test("tracks using router `path` property", async () => {
      const localVue = createLocalVue();
      const router = new VueRouter({
        mode: "abstract",
        routes: [{ name: "home", path: "/" }],
      });

      localVue.use(VueGtag, {
        config: {
          id: 1,
        },
      });

      localVue.use(VueRouter);

      router.push("/about?foo=bar");

      await flushPromises();

      pageview(router.currentRoute);

      expect(event).toHaveBeenCalledWith("page_view", {
        send_page_view: true,
        page_path: "/about",
        page_location: "window_location_href_value",
      });
    });

    test("tracks using router `fullPath` property", async () => {
      const localVue = createLocalVue();

      localVue.use(VueGtag, {
        pageTrackerUseFullPath: true,
        config: {
          id: 1,
        },
      });

      const router = new VueRouter({
        mode: "abstract",
        routes: [{ name: "home", path: "/" }],
      });

      localVue.use(VueRouter);

      router.push("/about?foo=bar");

      await flushPromises();

      pageview(router.currentRoute);

      expect(event).toHaveBeenCalledWith("page_view", {
        send_page_view: true,
        page_path: "/about?foo=bar",
        page_location: "window_location_href_value",
      });
    });
  });
});
