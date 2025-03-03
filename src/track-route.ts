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

export default function trackRoute(route: RouteLocationNormalizedGeneric) {
  const { pageTracker } = getSettings();

  if (isRouteExcluded(route)) {
    return;
  }

  pageTracker?.onBeforeTrack?.();

  const eventType = pageTracker?.useScreenview ? "screen_view" : "page_view";

  if (pageTracker?.template) {
    const template =
      typeof pageTracker.template === "function"
        ? pageTracker.template(route)
        : pageTracker.template;

    query("event", eventType, template);
  } else if (pageTracker?.useScreenview) {
    query("event", eventType, {
      app_name: pageTracker.appName,
      screen_name: route.name,
    });
  } else {
    query("event", eventType, { page_path: route.path });
  }

  pageTracker?.onAfterTrack?.();
}
