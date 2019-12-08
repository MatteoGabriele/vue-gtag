import event from "@/api/event";
import query from "@/api/query";
import { getOptions } from "@/install";

jest.mock("@/install");
jest.mock("@/api/query");

describe("api/event", () => {
  it("should be called with an event name and parameters", () => {
    getOptions.mockReturnValueOnce({
      defaultGroupName: "default"
    });

    event("click", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "click", { foo: "bar" });
  });

  it("should add the send_to parameter when includes is set", () => {
    getOptions.mockReturnValueOnce({
      defaultGroupName: "default",
      includes: [{ id: "foo" }]
    });

    event("click");

    expect(query).toHaveBeenCalledWith("event", "click", {
      send_to: ["foo", "default"]
    });
  });

  it("should not override the sent_to property when set already", () => {
    getOptions.mockReturnValueOnce({
      defaultGroupName: "default",
      includes: [{ id: "foo" }]
    });

    event("click", { send_to: ["bar"] });

    expect(query).toHaveBeenCalledWith("event", "click", {
      send_to: ["bar"]
    });
  });
});
