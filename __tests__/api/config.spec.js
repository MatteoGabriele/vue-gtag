import config from "@/api/config";
import { getOptions } from "@/install";
import query from "@/api/query";

jest.mock("@/api/query");
jest.mock("@/install");

describe("api/config", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be called with this parameters", () => {
    getOptions.mockReturnValue({
      config: { id: 1 },
    });

    config("foo");
    expect(query).toHaveBeenCalledWith("config", 1, "foo");

    config({ foo: "bar" });
    expect(query).toHaveBeenCalledWith("config", 1, { foo: "bar" });
  });

  it("should fire config twice", () => {
    getOptions.mockReturnValue({
      includes: [{ id: 2 }],
      config: {
        id: 1,
      },
    });

    config("foo");

    expect(query).toHaveBeenCalledTimes(2);
    expect(query.mock.calls[0]).toEqual(["config", 1, "foo"]);
    expect(query.mock.calls[1]).toEqual(["config", 2, "foo"]);
  });
});
