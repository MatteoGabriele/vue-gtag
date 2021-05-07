import { createApp } from "vue";
import flushPromises from "flush-promises";
import { createMemoryHistory, createRouter } from "vue-router";
import VueGtag from "@/index";
import * as api from "@/api";
import * as utils from "@/utils";
import addConfiguration from "@/add-configuration";
import track from "@/track";

jest.mock("@/track");
jest.mock("@/api");
jest.mock("@/add-configuration");

const Home = { template: "<div></div>" };
const About = { template: "<div></div>" };
const Contact = { template: "<div></div>" };

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
    router = createRouter({
      history: createMemoryHistory(),
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
    const app = createApp();

    app.use(router);

    jest.spyOn(router, "isReady").mockResolvedValue();

    app.use(
      VueGtag,
      {
        config: {
          id: 1,
        },
      },
      router
    );

    router.push("/");
    await flushPromises();

    expect(router.isReady).toHaveBeenCalledBefore(api.config);
  });

  test("fires the config hit", async () => {
    const app = createApp();

    app.use(router);

    app.use(
      VueGtag,
      {
        config: {
          id: 1,
        },
      },
      router
    );

    router.push("/");
    await flushPromises();

    expect(addConfiguration).toHaveBeenCalled();

    expect(track).toHaveBeenCalledWith(router.currentRoute.value);
    expect(track).toHaveBeenCalledTimes(1);
  });

  test("fires track after each route change", async () => {
    const app = createApp();

    app.use(router);

    app.use(
      VueGtag,
      {
        config: {
          id: 1,
        },
      },
      router
    );

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
    const app = createApp();
    const onBeforeTrackSpy = jest.fn();

    app.use(router);

    app.use(
      VueGtag,
      {
        onBeforeTrack: onBeforeTrackSpy,
        config: {
          id: 1,
        },
      },
      router
    );

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
    const app = createApp();
    const onAfterTrackSpy = jest.fn();

    app.use(router);

    app.use(
      VueGtag,
      {
        onAfterTrack: onAfterTrackSpy,
        config: {
          id: 1,
        },
      },
      router
    );

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
    const app = createApp();
    const onAfterTrackSpy = jest.fn();
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { name: "home", path: "/", component: Home },
        { path: "/about", component: About },
        { name: "contacts", path: "/contacts", component: Contact },
      ],
    });

    app.use(router);

    app.use(
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
