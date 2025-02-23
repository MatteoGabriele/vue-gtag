import { createGtag } from "@/index";
import initGtag from "@/init-gtag";
import { resetConfig } from "./config";

vi.mock("@/init-gtag");

describe("index", () => {
  beforeEach(resetConfig);

  it("should be disabled by default", () => {
    createGtag({
      targetId: "UA-1234567",
    });

    expect(initGtag).not.toHaveBeenCalled();
  });

  it("should enable plugin", () => {
    createGtag({
      targetId: "UA-1234567",
      enabled: true,
    });

    expect(initGtag).toHaveBeenCalled();
  });

  it("should enable plugin with a promise", () => {
    createGtag({
      targetId: "UA-1234567",
      enabled: () => Promise.resolve(true),
    });

    expect(initGtag).toHaveBeenCalled();
  });
});
