import { getOptions } from "@/options";
import config from "@/api/config";
import query from "@/api/query";

jest.mock("@/api/query");
jest.mock("@/options");

const UA_ID = "UA-123456-1";
const UA_ID_2 = "UA-123456-2";

describe("config", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fires config with domain ID and any arguments", () => {
    getOptions.mockReturnValue({ config: { id: UA_ID } });

    config("foo");

    expect(query).toHaveBeenCalledWith("config", UA_ID, "foo");
    expect(query).toHaveBeenCalledTimes(1);
  });

  test("fires config with domain ID and any arguments for multiple domains", () => {
    getOptions.mockReturnValue({
      includes: [
        {
          id: UA_ID_2,
          params: {
            userId: 1,
          },
        },
      ],
      config: {
        id: UA_ID,
      },
    });

    config("foo");

    expect(query).toHaveBeenNthCalledWith(1, "config", UA_ID, "foo");
    expect(query).toHaveBeenNthCalledWith(2, "config", UA_ID_2, "foo");
    expect(query).toHaveBeenCalledTimes(2);
  });
});
