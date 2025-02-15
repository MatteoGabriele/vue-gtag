import config from "@/api/config";
import query from "@/api/query";
import { getOptions } from "@/options";

vi.mock("@/api/query");
vi.mock("@/options");

describe("config", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("fires config with domain ID and any arguments", () => {
    getOptions.mockReturnValue({ config: { id: 1 } });

    config("foo");

    expect(query).toHaveBeenCalledWith("config", 1, "foo");
    expect(query).toHaveBeenCalledTimes(1);
  });

  test("fires config with domain ID and any arguments for multiple domains", () => {
    getOptions.mockReturnValue({
      includes: [
        {
          id: 2,
          params: {
            userId: 1,
          },
        },
      ],
      config: {
        id: 1,
      },
    });

    config("foo");

    expect(query).toHaveBeenNthCalledWith(1, "config", 1, "foo");
    expect(query).toHaveBeenNthCalledWith(2, "config", 2, "foo");
    expect(query).toHaveBeenCalledTimes(2);
  });
});
