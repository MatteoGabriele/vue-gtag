import addGtag from "./core/add-gtag";
import { createGtag } from "./index";

vi.mock("./core/add-gtag");

describe("index", () => {
  it("should install the plugin", () => {
    createGtag({ tagId: "UA-123456789" });
    expect(addGtag).toHaveBeenCalled();
  });
});
