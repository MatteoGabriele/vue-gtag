import addGtag from "./add-gtag";
import { createGtag } from "./create-gtag";

vi.mock("./add-gtag");

describe("index", () => {
  it("should install the plugin", () => {
    createGtag({ tagId: "UA-123456789" });
    expect(addGtag).toHaveBeenCalled();
  });
});
