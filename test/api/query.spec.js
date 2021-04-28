import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import query from "@/api/query";

describe("query", () => {
  test("passes argumemets to the gtag instance", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    jest.spyOn(window, "gtag").mockReturnValue();

    query("foo", "bar");

    expect(window.gtag).toHaveBeenCalledWith("foo", "bar");
  });
});
