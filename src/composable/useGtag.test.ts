import * as api from "@/api";
import useGtag from "./useGtag";

describe("gtag", () => {
  it("should return useGtag composable", () => {
    expect(useGtag()).toEqual(api);
  });
});
