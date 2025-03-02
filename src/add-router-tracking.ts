import { getSettings } from "@/settings";
import trackRoute from "@/track-route";

export default async function addRouterTracking(): Promise<void> {
  const { router } = getSettings();

  if (!router) {
    return;
  }

  await router.isReady();

  trackRoute(router.currentRoute.value);

  router.afterEach(trackRoute);
}
