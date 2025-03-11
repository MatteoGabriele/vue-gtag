import addConfiguration from "@/add-configuration";
import query from "@/api/query";
import { resetSettings, updateSettings } from "@/settings";
import mockdate from "mockdate";

mockdate.set("2025-02-27");

vi.mock("@/api/query");

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
    });

    expect(query).toHaveBeenNthCalledWith(3, "config", "UA-2", {
      send_page_view: false,
    });

    expect(query).toHaveBeenNthCalledWith(4, "config", "UA-3", {
      currency: "USD",
      send_page_view: false,
    });

    expect(query).toHaveBeenNthCalledWith(5, "config", "UA-4", {
      send_page_view: true,
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
});
