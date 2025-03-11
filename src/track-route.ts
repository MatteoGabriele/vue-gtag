import pageview from "@/api/pageview";
import screenview from "@/api/screenview";
import { getSettings } from "@/settings";
import type { PageTrackerParams, Route } from "@/types";

function isRouteExcluded(route: Route): boolean {
  const { pageTracker } = getSettings();

  if (!pageTracker?.exclude) {
    return false;
  }

  return pageTracker.exclude?.some(({ name, path } = {}) => {
    return (name && name === route.name) || (path && path === route.path);
  });
}

export default function trackRoute(route: Route) {
  const { pageTracker } = getSettings();

  if (isRouteExcluded(route)) {
    return;
  }

  pageTracker?.onBeforeTrack?.(route);

  let template: PageTrackerParams | undefined;

  if (pageTracker?.template) {
    template =
      typeof pageTracker.template === "function"
        ? pageTracker.template(route)
        : pageTracker.template;
  }

  if (pageTracker?.useScreenview) {
    const screenviewParams =
      template && "screen_name" in template ? template : route;

    screenview(screenviewParams);
  } else {
    const pageviewParams =
      template && "page_path" in template ? template : route;

    pageview(pageviewParams);
  }

  pageTracker?.onAfterTrack?.(route);
}
