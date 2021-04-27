import { mount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";
import VueGtag from "@/index";
import * as api from "@/api";
import * as utils from "@/utils";

jest.mock("@/api");

const UA_ID = "UA-123456-7";

const App = { template: "<div>app</div>" };
const Home = { template: "<div>home</div>" };
const About = { template: "<div>about</div>" };

describe("page-tracker", () => {
  let router;

  beforeEach(() => {
    router = new VueRouter({
      mode: "abstract",
      routes: [
        { name: "home", path: "/", component: Home },
        { name: "about", path: "/about", component: About },
      ],
    });

    jest.spyOn(window.console, "warn").mockReturnValue();
    jest.spyOn(utils, "load").mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("waits router ready before start tracking", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    jest.spyOn(router, "onReady").mockResolvedValue();

    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");
    await flushPromises();

    expect(router.onReady).toHaveBeenCalledBefore(api.config);
  });

  test("fires the config hit", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");
    await flushPromises();

    expect(api.config).toHaveBeenCalledWith({
      send_page_view: false,
    });

    expect(api.pageview).toHaveBeenCalledWith({
      page_title: "home",
      page_path: "/",
      page_location: "http://localhost/",
    });

    expect(api.pageview).toHaveBeenCalledTimes(1);
    expect(api.config).toHaveBeenCalledTimes(1);
  });

  describe("pageTrackerScreenviewEnabled", () => {
    test("tracks with screenview instead of pageview", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          appName: "MyApp",
          config: {
            id: UA_ID,
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
            id: UA_ID,
          },
        },
        router
      );

      mount(App, { localVue, router });

      router.push("/");

      await flushPromises();

      expect(console.warn).toHaveBeenCalledWith(
        `[vue-gtag] Missing "appName" value inside the plugin options.`
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
            foo: to.name,
            bar: from.path,
          }),
          config: {
            id: UA_ID,
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
        foo: "about",
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
            foo: to.name,
            bar: from.path,
          }),
          config: {
            id: UA_ID,
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
        foo: "about",
        bar: "/",
      });

      expect(api.screenview).toHaveBeenCalledTimes(2);
    });
  });

  describe("pageTrackerUseFullPath", () => {
    test("tracks using router `path` property", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          config: {
            id: UA_ID,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/about?foo=bar");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          page_path: "/about",
        })
      );
    });

    test("tracks using router `fullPath` property", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          pageTrackerUseFullPath: true,
          config: {
            id: UA_ID,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/about?foo=bar");
      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith(
        expect.objectContaining({
          page_path: "/about?foo=bar",
        })
      );
    });
  });

  test("tracks routes automatically on push", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");
    await flushPromises();

    router.push("/about");
    await flushPromises();

    router.push("/");
    await flushPromises();

    expect(api.pageview).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page_path: "/",
      })
    );

    expect(api.pageview).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page_path: "/about",
      })
    );

    expect(api.pageview).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page_path: "/",
      })
    );

    expect(api.pageview).toHaveBeenCalledTimes(3);
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
            id: UA_ID,
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
          page_path: "/about",
        })
      );

      expect(api.pageview).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          page_path: "/about",
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
            id: UA_ID,
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
          page_path: "/about",
        })
      );
      expect(api.pageview).toHaveBeenCalledTimes(1);
    });
  });

  test("fires the onBeforeTrack method", async () => {
    const localVue = createLocalVue();
    const onBeforeTrackSpy = jest.fn();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        onBeforeTrack: onBeforeTrackSpy,
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");
    await flushPromises();

    router.push("/about");
    await flushPromises();

    expect(onBeforeTrackSpy).toHaveBeenCalledTimes(1);
  });

  test("fires the onAfterTrack method", async () => {
    const localVue = createLocalVue();
    const onAfterTrackSpy = jest.fn();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        onAfterTrack: onAfterTrackSpy,
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");
    await flushPromises();

    router.push("/about");
    await flushPromises();

    expect(onAfterTrackSpy).toHaveBeenCalledTimes(1);
  });

  test("warns when route does not have a name", async () => {
    const localVue = createLocalVue();
    const router = new VueRouter({
      mode: "abstract",
      routes: [{ path: "/about" }],
    });

    localVue.use(VueRouter);
    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/about");
    await flushPromises();

    expect(console.warn).toHaveBeenCalledWith(
      `[vue-gtag] The route with path value "/about" doesn't have a name.`
    );
  });
});
