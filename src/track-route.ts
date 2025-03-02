import type { RouteLocationNormalizedGeneric } from "vue-router";
import query from "./gtag/query";
import { getSettings } from "./settings";

function isRouteExcluded(route: RouteLocationNormalizedGeneric): boolean {
  const { pageTracker } = getSettings();

  if (!pageTracker?.exclude) {
    return false;
  }

  return pageTracker.exclude?.some(({ name, path } = {}) => {
    return (name && name === route.name) || (path && path === route.path);
  });
}

function queryRoute(route: RouteLocationNormalizedGeneric) {
  const { pageTracker } = getSettings();

  if (pageTracker?.useScreenview) {
    query("event", "screen_view", {
      app_name: pageTracker.appName,
      screen_name: route.name,
    });
  } else {
    query("event", "page_view", { page_path: route.path });
  }
}

export default function trackRoute(route: RouteLocationNormalizedGeneric) {
  const { pageTracker } = getSettings();

  if (isRouteExcluded(route)) {
    return;
  }

  pageTracker?.onBeforeTrack?.();

  queryRoute(route);

  pageTracker?.onAfterTrack?.();
}
