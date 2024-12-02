import { expect, describe, vi, test, beforeEach } from "vitest";
import pageview from "src/api/pageview";
import { Route, Router } from "src/router";
import event from "src/api/event";
import { setOptions } from "src/options";

vi.mock("src/api/event");

const getRoute = (params?: Partial<Route>): Route => {
  return Object.assign(
    {},
    {
      fullPath: "/",
      path: "/",
      query: {},
      hash: "",
      name: "home",
      params: {},
      meta: {},
      matched: [],
      redirectedFrom: undefined,
    },
    params,
  );
};

describe("pageview", () => {
  let mockHref: string;

  beforeEach(() => {
    mockHref = "https://example.com/mock-path";

    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: mockHref },
    });
  });

  test("accept just the path", () => {
    pageview("/");

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_path: "/",
      page_location: mockHref,
    });
  });

  test("accept config params", () => {
    pageview({
      page_path: "/about",
      page_title: "about",
      page_location: mockHref,
    });

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "about",
      page_path: "/about",
      page_location: mockHref,
    });
  });

  test("accept route", () => {
    pageview(
      getRoute({
        name: "home",
        path: "/",
      }),
    );

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "home",
      page_path: "/",
      page_location: mockHref,
    });
  });

  test("use route fullPath", () => {
    setOptions({
      routerTrackFullPath: true,
    });

    pageview(
      getRoute({
        fullPath: "full_path_value",
      }),
    );

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "home",
      page_path: "full_path_value",
      page_location: mockHref,
    });
  });

  test("prepend route base path", () => {
    setOptions({
      router: {
        options: {
          history: {
            base: "app/",
          },
        },
      } as Router,
    });

    pageview(
      getRoute({
        name: "about",
        path: "/about",
      }),
    );

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "about",
      page_path: "app/about",
      page_location: mockHref,
    });
  });
});
