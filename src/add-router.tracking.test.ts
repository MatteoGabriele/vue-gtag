import query from "@/gtag/query";
import { createRouter, createWebHistory } from "vue-router";
import addRouterTracking from "./add-router-tracking";
import { updateSettings } from "./settings";

vi.mock("@/gtag/query");

const routes = [
	{ path: "/", component: { template: "<div />" } },
	{ path: "/about", component: { template: "<div />" } },
];

describe("add-router-tracking", () => {
	it("should track once the router is ready", async () => {
		const router = createRouter({
			history: createWebHistory(),
			routes,
		});

		vi.spyOn(router, "isReady").mockResolvedValue();

		updateSettings({ router });

		await addRouterTracking();

		expect(query).toHaveBeenCalledWith("event", "page_view", {
			page_path: "/",
		});
	});

	// it.todo("should track after route change", () => {});
});
