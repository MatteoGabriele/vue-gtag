import { getDefaultParams, getOptions, setOptions } from "@/options";

describe("options", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("getDefaultParams", () => {
    expect(getDefaultParams()).toMatchSnapshot();
  });

  test("set and get options", () => {
    setOptions({ config: { id: 1 } });
    expect(getOptions()).toMatchSnapshot();
  });

  test("should get default options", () => {
    setOptions();
    expect(getOptions()).toEqual(getDefaultParams());
  });
});
