import { createApp } from "vue";
import VueGtag from "@/index";
import MockDate from "mockdate";
import { createMemoryHistory, createRouter } from "vue-router";
import flushPromises from "flush-promises";
import registerGlobals from "@/register-globals";
import addRoutesTracker from "@/add-routes-tracker";
import * as utils from "@/utils";
import * as api from "@/api";
import addConfiguration from "@/add-configuration";
import bootstrap from "@/bootstrap";

MockDate.set("06-03-1997 10:00:00");

jest.mock("@/register-globals");
jest.mock("@/add-routes-tracker");
jest.mock("@/add-configuration");
jest.mock("@/api");

describe("boostrap", () => {
  beforeEach(() => {
    jest.spyOn(utils, "load").mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loads gtag script", async () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    const url = "https://www.googletagmanager.com/gtag/js?id=1&l=dataLayer";

    expect(utils.load).toHaveBeenCalledWith(url, {
      preconnectOrigin: "https://www.googletagmanager.com",
      defer: false,
    });
  });

  test("loads gtag script with custom source", () => {
    const app = createApp();

    app.use(VueGtag, {
      customResourceURL: "foo.com",
      config: {
        id: 1,
      },
    });

    expect(utils.load).toHaveBeenCalledWith(
      "foo.com?id=1&l=dataLayer",
      expect.any(Object)
    );
  });

  test("loads gtag script with custom preconnect origin", () => {
    const app = createApp();

    app.use(VueGtag, {
      customPreconnectOrigin: "bar.com",
      config: {
        id: 1,
      },
    });

    expect(utils.load).toHaveBeenCalledWith(expect.any(String), {
      preconnectOrigin: "bar.com",
      defer: false,
    });
  });

  test("loads gtag script with defer script", () => {
    const app = createApp();

    app.use(VueGtag, {
      deferScriptLoad: true,
      config: {
        id: 1,
      },
    });

    expect(utils.load).toHaveBeenCalledWith(expect.any(String), {
      preconnectOrigin: expect.any(String),
      defer: true,
    });
  });

  test("attaches library to window scope", () => {
    const app = createApp();

    app.use(VueGtag);

    expect(registerGlobals).toHaveBeenCalledBefore(addConfiguration);
  });

  test("fires a configuration hit on install", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    expect(api.optOut).not.toHaveBeenCalled();
    expect(addConfiguration).toHaveBeenCalled();
  });

  test("enables automatic page tracker", () => {
    const app = createApp();
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
      ],
    });

    app.use(
      VueGtag,
      {
        config: {
          id: 1,
        },
      },
      router
    );

    expect(addRoutesTracker).toHaveBeenCalled();
    expect(api.config).not.toHaveBeenCalled();
  });

  test("prevents script loading", async () => {
    const app = createApp();

    app.use(VueGtag, {
      disableScriptLoad: true,
      config: {
        id: 1,
      },
    });

    expect(utils.load).not.toHaveBeenCalled();
  });

  test("uses onReady callback after script is loaded", async () => {
    const app = createApp();
    const spy = jest.fn();

    Object.defineProperty(window, "gtag", {
      get: () => "global_registerd_value",
    });

    app.use(VueGtag, {
      onReady: spy,
      config: {
        id: 1,
      },
    });

    await flushPromises();

    expect(spy).toHaveBeenCalledWith("global_registerd_value");
  });

  test("uses onError callback after script failed loading", async () => {
    const app = createApp();
    const spy = jest.fn();
    const error = new Error("error_value");

    utils.load.mockRejectedValue(error);

    app.use(VueGtag, {
      onError: spy,
      config: {
        id: 1,
      },
    });

    await flushPromises();

    expect(spy).toHaveBeenCalledWith(error);
  });

  test("bootstrap manually", () => {
    const app = createApp();

    app.use(VueGtag, {
      bootstrap: false,
      config: {
        id: 1,
      },
    });

    bootstrap();

    expect(utils.load).toHaveBeenCalled();
    expect(addConfiguration).toHaveBeenCalled();
  });
});
