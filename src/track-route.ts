import pageview from "./api/pageview";
import screenview from "./api/screenview";
import { getSettings } from "./settings";
import type { PageTrackerParams } from "./types/page-tracker";
import type { Route } from "./types/router";

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
  const { pageTracker, hooks } = getSettings();

  if (isRouteExcluded(route)) {
    return;
  }

  hooks?.["router:track:before"]?.(route);

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

  hooks?.["router:track:after"]?.(route);
}
