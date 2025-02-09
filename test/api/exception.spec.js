import event from "@/api/event";
import exception from "@/api/exception";

jest.mock("@/api/event");

describe("exception", () => {
	test("fires a exception event", () => {
		exception({ foo: "bar" });

		expect(event).toHaveBeenCalledWith("exception", {
			foo: "bar",
		});
	});
});
