import config from "@/api/config";
import { getOptions } from "@/install";
import query from "@/api/query";

jest.mock("@/api/query");
jest.mock("@/install");

describe("api/config", () => {
  it("should be called with this parameters", () => {
    getOptions.mockReturnValueOnce({
      config: { id: 1 }
    });

    config("foo");
    expect(query).toHaveBeenCalledWith("config", 1, "foo");
  });
});
