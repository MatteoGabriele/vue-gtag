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

  test("passes argumemets to the custom named instance", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      globalObjectName: "foo",
    });

    jest.spyOn(window, "foo").mockReturnValue();

    query("foo", "bar");

    expect(window.foo).toHaveBeenCalledWith("foo", "bar");
  });
});
