import addGtag from "@/add-gtag";
import { createGtag, useGtag } from "@/index";
import { resetSettings } from "@/settings";
import flushPromises from "flush-promises";

vi.mock("@/add-gtag");

describe("index", () => {
  beforeEach(resetSettings);

  it("should be disabled by default", () => {
    createGtag({
      tagId: "UA-1234567",
    });

    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should enable plugin", () => {
    createGtag({
      tagId: "UA-1234567",
      enabled: true,
    });

    expect(addGtag).toHaveBeenCalled();
  });

  it("should enable plugin with a promise", async () => {
    createGtag({
      tagId: "UA-1234567",
      enabled: () => Promise.resolve(true),
    });

    await flushPromises();

    expect(addGtag).toHaveBeenCalled();
  });

  it("should export the useGtag composable", () => {
    expect(useGtag()).toBeDefined();
  });
});
