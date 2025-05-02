import { getSettings } from "@/core/settings";
import { trackRoute } from "@/core/track-route";

export async function addRouterTracking(): Promise<void> {
  const { pageTracker } = getSettings();

  if (!pageTracker?.router) {
    return;
  }

  const { router } = pageTracker;

  await router.isReady();

  trackRoute(router.currentRoute.value);

  router.afterEach((to, from) => {
    if (to.path === from.path) {
      return;
    }

    trackRoute(to);
  });
}
