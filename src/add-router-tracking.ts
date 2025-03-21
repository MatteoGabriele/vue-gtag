import { getSettings } from "./settings";
import trackRoute from "./track-route";

export default async function addRouterTracking(): Promise<void> {
  const { pageTracker } = getSettings();

  if (!pageTracker?.router) {
    return;
  }

  const { router } = pageTracker;

  await router.isReady();

  trackRoute(router.currentRoute.value);

  router.afterEach((to, from) => {
    if (to.path === from.path && pageTracker.skipSamePath) {
      return;
    }

    trackRoute(to);
  });
}
