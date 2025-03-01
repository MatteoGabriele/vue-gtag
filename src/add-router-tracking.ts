import type { RouteLocationNormalizedGeneric } from "vue-router";
import query from "./gtag/query";
import { getSettings } from "./settings";

function isRouteExcluded(route: RouteLocationNormalizedGeneric) {
  const { excludedRoutes } = getSettings();

  return excludedRoutes?.some(({ name, path } = {}) => {
    return (name && name === route.name) || (path && path === route.path);
  });
}

function trackRoute(route: RouteLocationNormalizedGeneric) {
  const { onBeforeTrack, onAfterTrack } = getSettings();

  if (isRouteExcluded(route)) {
    return;
  }

  onBeforeTrack?.();

  query("event", "page_view", { page_path: route.path });

  onAfterTrack?.();
}

export default async function addRouterTracking(): Promise<void> {
  const { router } = getSettings();

  if (!router) {
    return;
  }

  await router.isReady();

  trackRoute(router.currentRoute.value);

  router.afterEach(trackRoute);
}
