import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import MockDate from "mockdate";
import VueRouter from "vue-router";
import flushPromises from "flush-promises";
import registerGlobals from "@/register-globals";
import pageTracker from "@/page-tracker";
import * as utils from "@/utils";
import * as api from "@/api";

MockDate.set("06-03-1997 10:00:00");

jest.mock("@/register-globals");
jest.mock("@/api");
jest.mock("@/page-tracker");

const UA_ID = "UA-123456-7";

describe("boostrap", () => {
  beforeEach(() => {
    jest.spyOn(utils, "load").mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loads gtag script", async () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: UA_ID,
      },
    });

    const url =
      "https://www.googletagmanager.com/gtag/js?id=UA-123456-7&l=dataLayer";

    expect(utils.load).toHaveBeenCalledWith(url, {
      preconnectOrigin: "https://www.googletagmanager.com",
      defer: false,
    });
  });

  test("loads gtag script with custom source", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      customResourceURL: "foo.com",
      config: {
        id: UA_ID,
      },
    });

    expect(utils.load).toHaveBeenCalledWith(
      "foo.com?id=UA-123456-7&l=dataLayer",
      expect.any(Object)
    );
  });

  test("loads gtag script with custom preconnect origin", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      customPreconnectOrigin: "bar.com",
      config: {
        id: UA_ID,
      },
    });

    expect(utils.load).toHaveBeenCalledWith(expect.any(String), {
      preconnectOrigin: "bar.com",
      defer: false,
    });
  });

  test("loads gtag script with defer script", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      deferScriptLoad: true,
      config: {
        id: UA_ID,
      },
    });

    expect(utils.load).toHaveBeenCalledWith(expect.any(String), {
      preconnectOrigin: expect.any(String),
      defer: true,
    });
  });

  test("attaches library to window scope", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    expect(registerGlobals).toHaveBeenCalled();
  });

  test("fires a configuration hit on install", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: UA_ID,
      },
    });

    expect(api.config).toHaveBeenCalledWith({
      send_page_view: false,
    });
  });

  test("enables automatic page tracker", () => {
    const localVue = createLocalVue();
    const router = new VueRouter({
      mode: "abstract",
      routes: [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
      ],
    });

    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    expect(pageTracker).toHaveBeenCalled();
    expect(api.config).not.toHaveBeenCalled();
  });

  test("opt-out before the first hit", async () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      enabled: false,
      config: {
        id: UA_ID,
      },
    });

    await flushPromises();

    expect(api.optOut).toHaveBeenCalledBefore(api.config);
    expect(api.config).toHaveBeenCalledTimes(1);
  });

  test("prevents script loading", async () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      disableScriptLoad: true,
      config: {
        id: UA_ID,
      },
    });

    expect(utils.load).not.toHaveBeenCalled();
  });

  test("uses onReady callback after script is loaded", async () => {
    const localVue = createLocalVue();
    const spy = jest.fn();

    Object.defineProperty(window, "gtag", {
      get: () => "global_registerd_value",
    });

    localVue.use(VueGtag, {
      onReady: spy,
      config: {
        id: UA_ID,
      },
    });

    await flushPromises();

    expect(spy).toHaveBeenCalledWith("global_registerd_value");
  });

  test("uses onError callback after script failed loading", async () => {
    const localVue = createLocalVue();
    const spy = jest.fn();
    const error = new Error("error_value");

    utils.load.mockRejectedValue(error);

    localVue.use(VueGtag, {
      onError: spy,
      config: {
        id: UA_ID,
      },
    });

    await flushPromises();

    expect(spy).toHaveBeenCalledWith(error);
  });
});
