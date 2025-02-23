import query from "@/gtag/query";
import addConfiguration from "./add-configuration";
import { resetConfig, updateConfig } from "./config";

vi.mock("@/gtag/query");

describe("addConfiguration", () => {
  beforeEach(resetConfig);

  it("should query with initial configuration", () => {
    updateConfig({
      tagId: "UA-12345678",
      config: {
        send_page_view: false,
      },
    });

    addConfiguration();

    expect(query).toHaveBeenCalledWith("config", "UA-12345678", {
      send_page_view: false,
    });
  });
});
