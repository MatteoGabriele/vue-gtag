import { updateSettings } from "../../core/settings";
import { query } from "../query";
import { event } from "./event";

vi.mock("../query");

describe("event", () => {
  it("should query the event command", () => {
    event("screen_view", { screen_name: "about" });

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
    });
  });

  it("should add a group name", () => {
    updateSettings({
      additionalAccounts: [{ tagId: "UA-1" }, { tagId: "UA-2" }],
    });

    event("screen_view", { screen_name: "about" });

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
      send_to: "default",
    });
  });

  it("should use a custom group name", () => {
    updateSettings({
      additionalAccounts: [{ tagId: "UA-1" }, { tagId: "UA-2" }],
      groupName: "custom_group_name",
    });

    event("screen_view", { screen_name: "about" });

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
      send_to: "custom_group_name",
    });
  });

  it("should use the send_to property if already set", () => {
    updateSettings({
      additionalAccounts: [{ tagId: "UA-1" }, { tagId: "UA-2" }],
    });

    event("screen_view", {
      screen_name: "about",
      send_to: "my_custom_send_to",
    });

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
      send_to: "my_custom_send_to",
    });
  });
});
