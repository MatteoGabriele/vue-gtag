import mockdate from "mockdate";
import query from "../api/query";
import addConfiguration from "./add-configuration";
import { resetSettings, updateSettings } from "./settings";

mockdate.set("2025-02-27");

vi.mock("../api/query");

describe("addConfiguration", () => {
  beforeEach(resetSettings);

  it("should query with initial configuration", () => {
    updateSettings({
      tagId: "UA-12345678",
    });

    addConfiguration();

    expect(query).toHaveBeenNthCalledWith(1, "js", new Date());
    expect(query).toHaveBeenNthCalledWith(2, "config", "UA-12345678", {
      send_page_view: false,
      anonymize_ip: true,
    });
  });

  it("should query multiple domains", () => {
    updateSettings({
      tagId: "UA-1",
      additionalAccounts: [
        { tagId: "UA-2" },
        { tagId: "UA-3", config: { currency: "USD" } },
        { tagId: "UA-4", config: { send_page_view: true } },
      ],
    });

    addConfiguration();

    expect(query).toHaveBeenNthCalledWith(1, "js", new Date());
    expect(query).toHaveBeenNthCalledWith(2, "config", "UA-1", {
      send_page_view: false,
      anonymize_ip: true,
    });

    expect(query).toHaveBeenNthCalledWith(3, "config", "UA-2", {
      send_page_view: false,
      anonymize_ip: true,
      groups: "default",
    });

    expect(query).toHaveBeenNthCalledWith(4, "config", "UA-3", {
      currency: "USD",
      send_page_view: false,
      anonymize_ip: true,
      groups: "default",
    });

    expect(query).toHaveBeenNthCalledWith(5, "config", "UA-4", {
      send_page_view: true,
      anonymize_ip: true,
      groups: "default",
    });
  });

  it("should add the linker", () => {
    updateSettings({
      tagId: "UA-1",
      linker: {
        domains: ["domain.com"],
      },
    });

    addConfiguration();

    expect(query).toHaveBeenNthCalledWith(1, "set", "linker", {
      domains: ["domain.com"],
    });
    expect(query).toHaveBeenNthCalledWith(2, "js", new Date());
  });

  describe("hooks", () => {
    it("should fire the config:init:before hook", () => {
      const spyConfigBefore = vi.fn();

      updateSettings({
        tagId: "UA-1",
        hooks: {
          "config:init:before": spyConfigBefore,
        },
      });

      addConfiguration();

      expect(spyConfigBefore).toHaveBeenCalled();
      expect(query).toHaveBeenCalledAfter(spyConfigBefore);
    });

    it("should fire the config:init:after hook", () => {
      const spyConfigAfter = vi.fn();

      updateSettings({
        tagId: "UA-1",
        hooks: {
          "config:init:after": spyConfigAfter,
        },
      });

      addConfiguration();

      expect(spyConfigAfter).toHaveBeenCalled();
      expect(query).toHaveBeenCalledBefore(spyConfigAfter);
    });
  });

  describe("consent mode", () => {
    it("should set all granted", () => {
      updateSettings({
        tagId: "UA-12345678",
        consentMode: "granted",
      });

      addConfiguration();

      expect(query).toHaveBeenNthCalledWith(1, "consent", "default", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });

      expect(query).toHaveBeenNthCalledWith(2, "js", new Date());
    });

    it("should set all denied", () => {
      updateSettings({
        tagId: "UA-12345678",
        consentMode: "denied",
      });

      addConfiguration();

      expect(query).toHaveBeenNthCalledWith(1, "consent", "default", {
        ad_user_data: "denied",
        ad_personalization: "denied",
        ad_storage: "denied",
        analytics_storage: "denied",
      });

      expect(query).toHaveBeenNthCalledWith(2, "js", new Date());
    });
  });
});
