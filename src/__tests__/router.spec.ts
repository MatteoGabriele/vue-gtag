import { beforeEach, vi, describe, expect, test } from "vitest";
import { Route, trackRoute } from "src/router";
import api from "src/api";

vi.mock("src/api.ts");

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

vi.mock("src/helper.ts");

describe("router", () => {
  beforeEach(() => {
    vi.spyOn(api, "pageview");
  });

  describe("trackRoute", () => {
    test("does not track when hits the same path", () => {
      const to = getRoute({ path: "/" });
      const from = getRoute({ path: "/" });

      trackRoute(to, from);

      expect(api.pageview).not.toHaveBeenCalled();
    });
  });
});
