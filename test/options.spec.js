import { getOptions, setOptions, getDefaultParams } from "@/options";

describe("options", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
