import * as api from "@/api";
import VueGtag from "@/index";
import * as utils from "@/utils";
import flushPromises from "flush-promises";
import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

vi.mock("@/api");

const Home = { template: "<div></div>" };
const About = { template: "<div></div>" };

describe("track", () => {
  const { location } = window;
  let router;

  beforeAll(() => {
    window.location = {
      href: "window_location_href_value",
    };
  });

  afterAll(() => {
    window.location = location;
  });

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { name: "home", path: "/", component: Home },
        { path: "/about", component: About },
      ],
    });

    vi.spyOn(window.console, "warn").mockReturnValue();
    vi.spyOn(utils, "load").mockResolvedValue();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("pageview", () => {
    test("tracks route with name", async () => {
      const app = createApp();

      app.use(router);
      app.use(
        VueGtag,
        {
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "home",
          path: "/",
        }),
      );
    });

    test("tracks route without name", async () => {
      const app = createApp();

      app.use(router);
      app.use(
        VueGtag,
        {
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/about");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          path: "/about",
        }),
      );
    });
  });

  describe("screenview", () => {
    test("tracks route with screenview", async () => {
      const app = createApp();

      app.use(router);

      app.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          appName: "MyApp",
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/");
      await flushPromises();

      expect(api.screenview).toHaveBeenCalledWith({
        app_name: "MyApp",
        screen_name: "home",
      });
      expect(api.screenview).toHaveBeenCalledTimes(1);
    });

    test("warns when no appName is provided", async () => {
      const app = createApp();

      app.use(router);
      app.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/");

      await flushPromises();

      expect(console.warn).toHaveBeenCalledWith(
        `[vue-gtag] Missing "appName" property inside the plugin options.`,
      );
    });

    test("warns when no route name is provided", async () => {
      const app = createApp();

      app.use(router);
      app.use(
        VueGtag,
        {
          appName: "MyApp",
          pageTrackerScreenviewEnabled: true,
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/about");

      await flushPromises();

      expect(console.warn).toHaveBeenCalledWith(
        `[vue-gtag] Missing "name" property in the route.`,
      );
    });
  });

  describe("pageTrackerTemplate", () => {
    test("tracks pageview", async () => {
      const app = createApp();

      app.use(router);

      app.use(
        VueGtag,
        {
          pageTrackerTemplate: (to, from) => ({
            foo: to.path,
            bar: from.path,
          }),
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/");
      await flushPromises();

      router.push("/about");
      await flushPromises();

      expect(api.pageview).toHaveBeenNthCalledWith(2, {
        foo: "/about",
        bar: "/",
      });
    });

    test("tracks screenview", async () => {
      const app = createApp();

      app.use(router);

      app.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          pageTrackerTemplate: (to, from) => ({
            foo: to.path,
            bar: from.path,
          }),
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/");
      await flushPromises();

      router.push("/about");
      await flushPromises();

      expect(api.screenview).toHaveBeenNthCalledWith(2, {
        foo: "/about",
        bar: "/",
      });

      expect(api.screenview).toHaveBeenCalledTimes(2);
    });
  });

  describe("pageTrackerSkipSamePath", () => {
    test("tracks the same path twice", async () => {
      const app = createApp();

      app.use(router);

      app.use(
        VueGtag,
        {
          pageTrackerSkipSamePath: false,
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/about");
      await flushPromises();

      router.push("/about?foo=bar");
      await flushPromises();

      expect(api.pageview).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          path: "/about",
        }),
      );

      expect(api.pageview).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          path: "/about",
        }),
      );
    });

    test("tracks the same path once", async () => {
      const app = createApp();

      app.use(router);

      app.use(
        VueGtag,
        {
          config: {
            id: 1,
          },
        },
        router,
      );

      router.push("/about");
      await flushPromises();

      router.push("/about?foo=bar");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          path: "/about",
        }),
      );
      expect(api.pageview).toHaveBeenCalledTimes(1);
    });
  });
});
