import event from "@/api/event";
import pageview from "@/api/pageview";
import VueGtag from "@/index";
import flushPromises from "flush-promises";
import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

vi.mock("@/api/event");

const Home = { template: "<div><div>" };
const About = { template: "<div><div>" };

describe("pageview", () => {
  const _window = window;
  const { location } = window;

  beforeAll(() => {
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
    vi.resetAllMocks();
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
    const app = createApp();
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ name: "home", path: "/", component: Home }],
    });

    app.use(router);

    router.push("/");

    await flushPromises();

    pageview(router.currentRoute.value);

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "home",
      page_path: "/",
      page_location: "window_location_href_value",
    });
  });

  test("track pageview without window", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: { id: 1 },
    });

    expect(() => {
      pageview("/");
    }).not.toThrow();
  });

  describe("pageTrackerUseFullPath", () => {
    test("tracks using router `path` property", async () => {
      const app = createApp();
      const router = createRouter({
        history: createMemoryHistory(),
        routes: [
          { path: "/", component: Home },
          { path: "/about", component: About },
        ],
      });

      app.use(router);

      app.use(VueGtag, {
        config: {
          id: 1,
        },
      });

      router.push("/about?foo=bar");

      await flushPromises();

      pageview(router.currentRoute.value);

      expect(event).toHaveBeenCalledWith("page_view", {
        send_page_view: true,
        page_path: "/about",
        page_location: "window_location_href_value",
      });
    });

    test("tracks using router `fullPath` property", async () => {
      const app = createApp();

      app.use(VueGtag, {
        pageTrackerUseFullPath: true,
        config: {
          id: 1,
        },
      });

      const router = createRouter({
        history: createMemoryHistory(),
        routes: [
          { path: "/", component: Home },
          { path: "/about", component: About },
        ],
      });

      app.use(router);

      router.push("/about?foo=bar");

      await flushPromises();

      pageview(router.currentRoute.value);

      expect(event).toHaveBeenCalledWith("page_view", {
        send_page_view: true,
        page_path: "/about?foo=bar",
        page_location: "window_location_href_value",
      });
    });
  });

  describe("router base path", () => {
    test("use with router installed", async () => {
      const app = createApp();
      const router = createRouter({
        history: createMemoryHistory(),
        base: "/app/",
        routes: [
          { path: "/", component: Home },
          { path: "/about", component: About },
        ],
      });

      app.use(router);
      app.use(
        VueGtag,
        {
          pageTrackerPrependBase: true,
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/about");

      await flushPromises();

      pageview(router.currentRoute.value);

      expect(event).toHaveBeenCalledWith("page_view", {
        send_page_view: true,
        page_path: "/app/about",
        page_location: "window_location_href_value",
      });
    });

    test("use without router installed", async () => {
      const app = createApp();
      const router = createRouter({
        history: createMemoryHistory(),
        base: "/app/",
        routes: [
          { path: "/", component: Home },
          { path: "/about", component: About },
        ],
      });

      app.use(router);
      app.use(VueGtag, {
        pageTrackerPrependBase: true,
        config: {
          id: 1,
        },
      });

      router.push("/about");

      await flushPromises();

      pageview(router.currentRoute.value);

      expect(event).toHaveBeenCalledWith("page_view", {
        send_page_view: true,
        page_path: "/about",
        page_location: "window_location_href_value",
      });
    });
  });
});
