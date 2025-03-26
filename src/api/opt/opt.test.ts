import { resetSettings, updateSettings } from "../../core/settings";
import { optIn, optOut } from "./opt";

describe("opt", () => {
  beforeEach(() => {
    resetSettings();
    window["ga-disable-UA-1"] = undefined;
    window["ga-disable-UA-2"] = undefined;
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

  describe("use additional account", () => {
    beforeEach(() => {
      updateSettings({
        tagId: "UA-1",
        additionalAccounts: [
          {
            tagId: "UA-2",
          },
        ],
      });
    });

    it("should opt out", () => {
      optOut();

      expect(window["ga-disable-UA-1"]).toBe(true);
      expect(window["ga-disable-UA-2"]).toBe(true);
    });

    it("should opt in", () => {
      optOut();
      optIn();

      expect(window["ga-disable-UA-1"]).toBeUndefined();
      expect(window["ga-disable-UA-2"]).toBeUndefined();
    });
  });
});
