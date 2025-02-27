import addConfiguration from "@/add-configuration";
import query from "@/gtag/query";
import { resetSettings, updateSettings } from "@/settings";
import mockdate from "mockdate";

mockdate.set("2025-02-27");

vi.mock("@/gtag/query");

describe("addConfiguration", () => {
  beforeEach(resetSettings);

  it("should query with initial configuration", () => {
    updateSettings({
      tagId: "UA-12345678",
      config: {
        send_page_view: false,
      },
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
        { tagId: "UA-2", config: { send_page_view: false } },
        { tagId: "UA-3", config: { currency: "USD" } },
      ],
    });

    addConfiguration();

    expect(query).toHaveBeenNthCalledWith(1, "js", new Date());
    expect(query).toHaveBeenNthCalledWith(2, "config", "UA-1", undefined);

    expect(query).toHaveBeenNthCalledWith(3, "config", "UA-2", {
      send_page_view: false,
    });

    expect(query).toHaveBeenNthCalledWith(4, "config", "UA-3", {
      currency: "USD",
    });
  });
});
