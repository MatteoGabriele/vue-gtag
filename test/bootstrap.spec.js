import { install } from "./utils";
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

  test("load gtag script", async () => {
    install({
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

  test("load gtag script with custom source", () => {
    install({
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

  test("load gtag script with custom preconnect origin", () => {
    install({
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

  test("load gtag script with defer script", () => {
    install({
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

  test("attach library to window scope", () => {
    install();

    expect(registerGlobals).toHaveBeenCalled();
  });

  test("fire a configuration hit on install", () => {
    install({
      config: {
        id: UA_ID,
      },
    });

    expect(api.config).toHaveBeenCalledWith({
      send_page_view: false,
    });
  });

  test("enable automatic page tracker", () => {
    const router = new VueRouter({
      mode: "abstract",
      routes: [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
      ],
    });

    install(
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
    install({
      enabled: false,
      config: {
        id: UA_ID,
      },
    });

    await flushPromises();

    expect(api.optOut).toHaveBeenCalledBefore(api.config);
    expect(api.config).toHaveBeenCalledTimes(1);
  });

  test("prevent script loading", async () => {
    install({
      disableScriptLoad: true,
      config: {
        id: UA_ID,
      },
    });

    expect(utils.load).not.toHaveBeenCalled();
  });

  test("use onReady callback after script is loaded", async () => {
    const spy = jest.fn();

    Object.defineProperty(window, "gtag", {
      get: () => "global_registerd_value",
    });

    install({
      onReady: spy,
      config: {
        id: UA_ID,
      },
    });

    await flushPromises();

    expect(spy).toHaveBeenCalledWith("global_registerd_value");
  });

  test("use onError callback after script failed loading", async () => {
    const spy = jest.fn();
    const error = new Error("error_value");

    utils.load.mockRejectedValue(error);

    install({
      onError: spy,
      config: {
        id: UA_ID,
      },
    });

    await flushPromises();

    expect(spy).toHaveBeenCalledWith(error);
  });
});
