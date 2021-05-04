import { mount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";
import VueGtag from "@/index";
import * as api from "@/api";
import * as utils from "@/utils";
import addConfiguration from "@/add-configuration";
import track from "@/track";

jest.mock("@/track");
jest.mock("@/api");
jest.mock("@/add-configuration");

const App = { template: "<div>app</div>" };

describe("page-tracker", () => {
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
      routes: [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
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
          id: 1,
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
          id: 1,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");
    await flushPromises();

    expect(addConfiguration).toHaveBeenCalled();

    expect(track).toHaveBeenCalledWith(router.currentRoute);
    expect(track).toHaveBeenCalledTimes(1);
  });

  test("fires track after each route change", async () => {
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

    router.push("/about");
    await flushPromises();

    router.push("/");
    await flushPromises();

    expect(track).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/",
        name: "home",
      })
    );

    expect(track).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/about",
        name: "about",
      }),
      expect.objectContaining({
        path: "/",
        name: "home",
      })
    );

    expect(track).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: "/",
        name: "home",
      }),
      expect.objectContaining({
        path: "/about",
        name: "about",
      })
    );

    expect(track).toHaveBeenCalledTimes(3);
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

    expect(onBeforeTrackSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/about",
        name: "about",
      }),
      expect.objectContaining({
        path: "/",
        name: "home",
      })
    );

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

    expect(onAfterTrackSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/about",
        name: "about",
      }),
      expect.objectContaining({
        path: "/",
        name: "home",
      })
    );

    expect(onAfterTrackSpy).toHaveBeenCalledTimes(1);
  });

  test("remove routes from tracking based on path", async () => {
    const localVue = createLocalVue();
    const onAfterTrackSpy = jest.fn();
    const router = new VueRouter({
      mode: "abstract",
      routes: [
        { name: "home", path: "/" },
        { path: "/about" },
        { name: "contacts", path: "/contacts" },
      ],
    });

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        pageTrackerExcludedRoutes: ["/about", "contacts"],
        onAfterTrack: onAfterTrackSpy,
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

    router.push("/contacts");
    await flushPromises();

    expect(track).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/",
      })
    );

    expect(track).toHaveBeenCalledTimes(1);
  });
});
