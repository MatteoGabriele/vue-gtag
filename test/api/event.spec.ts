import event from "@/api/event";
import query from "@/api/query";
import VueGtag from "@/index";
import { createApp } from "vue";

vi.mock("@/api/query");

describe("event", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("fires an event", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    event("foobar", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "foobar", { foo: "bar" });
  });

  test("attaches send_to to assign the event to multiple domains", () => {
    const app = createApp();

    app.use(VueGtag, {
      includes: [{ id: 2 }],
      config: {
        id: 1,
      },
    });

    event("foobar", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "foobar", {
      foo: "bar",
      send_to: [2, "default"],
    });
  });

  test("do not overwrite send_to if already set", () => {
    const app = createApp();

    app.use(VueGtag, {
      includes: [{ id: 2 }],
      config: {
        id: 1,
      },
    });

    event("foobar", { foo: "bar", send_to: ["bar"] });

    expect(query).toHaveBeenCalledWith("event", "foobar", {
      foo: "bar",
      send_to: ["bar"],
    });
  });

  test("when using send_to, default group name can be customized", () => {
    const app = createApp();

    app.use(VueGtag, {
      includes: [{ id: 2 }],
      defaultGroupName: "custom_default_group_value",
      config: {
        id: 1,
      },
    });

    event("foobar", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "foobar", {
      foo: "bar",
      send_to: [2, "custom_default_group_value"],
    });
  });
});
