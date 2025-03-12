import * as api from "@/api";
import useGtag from "./use-gtag";

describe("gtag", () => {
  it("should return useGtag composable", () => {
    expect(useGtag()).toEqual(api);
  });
});
