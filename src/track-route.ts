import type { RouteLocationNormalizedGeneric } from "vue-router";
import query from "./gtag/query";
import { getSettings } from "./settings";

function isRouteExcluded(route: RouteLocationNormalizedGeneric) {
  const { excludedRoutes } = getSettings();

  return excludedRoutes?.some(({ name, path } = {}) => {
    return (name && name === route.name) || (path && path === route.path);
  });
}

function queryRoute(route: RouteLocationNormalizedGeneric) {
  query("event", "page_view", { page_path: route.path });
}

export default function trackRoute(route: RouteLocationNormalizedGeneric) {
  const { onBeforeTrack, onAfterTrack } = getSettings();

  if (isRouteExcluded(route)) {
    return;
  }

  onBeforeTrack?.();

  queryRoute(route);

  onAfterTrack?.();
}
