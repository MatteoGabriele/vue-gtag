import { createLocalVue } from "@vue/test-utils";
import event from "@/api/event";
import query from "@/api/query";
import VueGtag from "@/index";

jest.mock("@/api/query");

const UA_ID = "UA-123456-1";
const UA_ID_2 = "UA-123456-2";

describe("event", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fires an event", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: UA_ID,
      },
    });

    event("foobar", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "foobar", { foo: "bar" });
  });

  test("attaches send_to to assign the event to multiple domains", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [{ id: UA_ID_2 }],
      config: {
        id: UA_ID,
      },
    });

    event("foobar", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "foobar", {
      foo: "bar",
      send_to: [UA_ID_2, "default"],
    });
  });

  test("do not overwrite send_to if already set", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [{ id: UA_ID_2 }],
      config: {
        id: UA_ID,
      },
    });

    event("foobar", { foo: "bar", send_to: ["bar"] });

    expect(query).toHaveBeenCalledWith("event", "foobar", {
      foo: "bar",
      send_to: ["bar"],
    });
  });

  test("when using send_to, default group name can be customized", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [{ id: UA_ID_2 }],
      defaultGroupName: "custom_default_group_value",
      config: {
        id: UA_ID,
      },
    });

    event("foobar", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "foobar", {
      foo: "bar",
      send_to: [UA_ID_2, "custom_default_group_value"],
    });
  });
});
