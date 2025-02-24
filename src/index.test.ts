import { createGtag } from "@/index";
import initGtag from "@/init-gtag";
import { resetSettings } from "@/settings";
import flushPromises from "flush-promises";

vi.mock("@/init-gtag");

describe("index", () => {
  beforeEach(resetSettings);

  it("should be disabled by default", () => {
    createGtag({
      tagId: "UA-1234567",
    });

    expect(initGtag).not.toHaveBeenCalled();
  });

  it("should enable plugin", () => {
    createGtag({
      tagId: "UA-1234567",
      enabled: true,
    });

    expect(initGtag).toHaveBeenCalled();
  });

  it("should enable plugin with a promise", async () => {
    createGtag({
      tagId: "UA-1234567",
      enabled: () => Promise.resolve(true),
    });

    await flushPromises();

    expect(initGtag).toHaveBeenCalled();
  });
});
