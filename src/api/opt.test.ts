import { updateSettings } from "../settings";
import { optIn, optOut } from "./opt";

describe("opt", () => {
  beforeEach(() => {
    window["ga-disable-UA-1"] = undefined;
  });

  it("should opt out", () => {
    updateSettings({
      tagId: "UA-1",
    });

    optOut();

    expect(window["ga-disable-UA-1"]).toBe(true);
  });

  it("should opt in", () => {
    updateSettings({
      tagId: "UA-1",
    });

    optOut();
    optIn();

    expect(window["ga-disable-UA-1"]).toBeUndefined();
  });

  describe("custom tagId", () => {
    it("should opt out", () => {
      optOut("UA-1");

      expect(window["ga-disable-UA-1"]).toBe(true);
    });

    it("should opt in", () => {
      optOut("UA-1");
      optIn("UA-1");

      expect(window["ga-disable-UA-1"]).toBeUndefined();
    });
  });
});
