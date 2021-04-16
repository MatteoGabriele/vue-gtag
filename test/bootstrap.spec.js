import { install } from "./utils";
import * as utils from "@/utils";
import MockDate from "mockdate";
import query from "@/api/query";

jest.mock("@/api/query");

MockDate.set("06-03-1997 10:00:00");

describe("boostrap", () => {
  beforeEach(() => {
    jest.spyOn(utils, "load").mockResolvedValue();
  });

  test("load gtag script", () => {
    install({
      config: {
        id: "UA-123456-7",
      },
    });

    expect(utils.load).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=UA-123456-7&l=dataLayer"
    );
  });

  test("define library and dataLayer", () => {
    install();

    expect(typeof window.gtag).toBe("function");
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  test("define custom library and dataLayer", () => {
    install({
      globalDataLayerName: "myCustomDatalayer",
      globalObjectName: "myCustomGtag",
    });

    expect(typeof window.myCustomGtag).toBe("function");
    expect(Array.isArray(window.myCustomDatalayer)).toBe(true);
  });

  test("first dataLayer item is a date", () => {
    install();
    expect(window.dataLayer[0]).toMatchSnapshot();
  });

  test("gtag configuration hit", () => {
    install({
      config: {
        id: "UA-123456-7",
      },
    });

    expect(query).toHaveBeenCalledWith("config", "UA-123456-7", {
      send_page_view: false,
    });
  });
});
