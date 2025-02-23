import { createGtag } from "@/index";
import initGtag from "@/init-gtag";
import flushPromises from "flush-promises";
import { resetConfig } from "./config";

vi.mock("@/init-gtag");

describe("index", () => {
  beforeEach(resetConfig);

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
