import { getSettings } from "@/settings";
import type { PageTrackerParams, Route } from "@/types";
import pageview from "./gtag/pageview";
import screenview from "./gtag/screenview";

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

  pageTracker?.onBeforeTrack?.();

  let template: PageTrackerParams = route;

  if (pageTracker?.template) {
    template =
      typeof pageTracker.template === "function"
        ? pageTracker.template(route)
        : pageTracker.template;
  }

  if (
    pageTracker?.useScreenview &&
    (typeof template === "string" ||
      "screen_name" in template ||
      "path" in template)
  ) {
    screenview(template);
  } else if (
    typeof template === "string" ||
    "path" in template ||
    "page_path" in template
  ) {
    pageview(template);
  }

  pageTracker?.onAfterTrack?.();
}
