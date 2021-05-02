import { mount, createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import VueRouter from "vue-router";
import flushPromises from "flush-promises";
import * as api from "@/api";
import * as utils from "@/utils";

jest.mock("@/api");

const App = { template: "<div>app</div>" };

describe("track", () => {
  const { location } = window;
  let router;

  beforeAll(() => {
    delete window.location;

    window.location = {
      href: "window_location_href_value",
    };
  });

  afterAll(() => {
    window.location = location;
  });

  beforeEach(() => {
    router = new VueRouter({
      mode: "abstract",
      routes: [{ name: "home", path: "/" }, { path: "/about" }],
    });

    jest.spyOn(window.console, "warn").mockReturnValue();
    jest.spyOn(utils, "load").mockResolvedValue();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("pageview", () => {
    test("tracks route with name", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);
      localVue.use(
        VueGtag,
        {
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "home",
          path: "/",
        })
      );
    });

    test("tracks route without name", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);
      localVue.use(
        VueGtag,
        {
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/about");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          path: "/about",
        })
      );
    });
  });

  describe("screenview", () => {
    test("tracks route with screenview", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          appName: "MyApp",
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/");
      await flushPromises();

      expect(api.screenview).toHaveBeenCalledWith({
        app_name: "MyApp",
        screen_name: "home",
      });
      expect(api.screenview).toHaveBeenCalledTimes(1);
    });

    test("warns when no appName is provided", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);
      localVue.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { localVue, router });

      router.push("/");

      await flushPromises();

      expect(console.warn).toHaveBeenCalledWith(
        `[vue-gtag] Missing "appName" property inside the plugin options.`
      );
    });

    test("warns when no route name is provided", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);
      localVue.use(
        VueGtag,
        {
          appName: "MyApp",
          pageTrackerScreenviewEnabled: true,
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { localVue, router });

      router.push("/about");

      await flushPromises();

      expect(console.warn).toHaveBeenCalledWith(
        `[vue-gtag] Missing "name" property in the route with path value "/about".`
      );
    });
  });

  describe("pageTrackerTemplate", () => {
    test("tracks pageview", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
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
        router
      );

      mount(App, { router, localVue });

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
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
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
        router
      );

      mount(App, { router, localVue });

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
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          pageTrackerSkipSamePath: false,
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/about");
      await flushPromises();

      router.push("/about?foo=bar");
      await flushPromises();

      expect(api.pageview).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          path: "/about",
        })
      );

      expect(api.pageview).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          path: "/about",
        })
      );
    });

    test("tracks the same path once", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          config: {
            id: 1,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/about");
      await flushPromises();

      router.push("/about?foo=bar");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          path: "/about",
        })
      );
      expect(api.pageview).toHaveBeenCalledTimes(1);
    });
  });
});
