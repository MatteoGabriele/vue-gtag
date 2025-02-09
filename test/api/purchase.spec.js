import event from "@/api/event";
import purchase from "@/api/purchase";

jest.mock("@/api/event");

describe("purchase", () => {
	test("fires a purchase event", () => {
		purchase({ foo: "bar" });

		expect(event).toHaveBeenCalledWith("purchase", {
			foo: "bar",
		});
	});
});
