import { query } from "@/api/query";
import { set } from "@/api/set";
import { getSettings } from "@/core/settings";
import type { GtagConfigParams } from "@/types/gtag";
import type { Route } from "@/types/settings";
import {
  getPathWithBase,
  hasUtmParams,
  urlQueryReplace,
  useUtmParams,
} from "@/utils";

export type Pageview = GtagConfigParams;
export type PageviewParams = string | Route | Pageview;

export function pageview(params: PageviewParams) {
  const { useUtmTracking, pageTracker } = getSettings();

  let template: PageviewParams | undefined;

  if (typeof params === "string") {
    template = {
      page_path: params,
    };
  } else if ("path" in params) {
    const base = pageTracker?.router.options.history.base ?? "";
    const path = pageTracker?.useRouteFullPath ? params.fullPath : params.path;

    template = {
      ...(params.name ? { page_title: params.name.toString() } : {}),
      page_path: pageTracker?.useRouterBasePath
        ? getPathWithBase(path, base)
        : path,
    };
  } else {
    template = params;
  }

  if (template.page_location === undefined) {
    template.page_location = window.location.href;
  }

  if (template.send_page_view === undefined) {
    template.send_page_view = pageTracker?.sendPageView ?? true;
  }

  if (template.page_path !== "/" && template.page_path?.endsWith("/")) {
    template.page_path = template.page_path.slice(0, -1);
  }

  if (useUtmTracking && hasUtmParams(template.page_location)) {
    const { utmParams, cleanUrl, cleanQueryParams } = useUtmParams(
      template.page_location,
    );

    template.page_location = cleanUrl;

    urlQueryReplace(cleanQueryParams);

    set("campaign", utmParams);
  }

  query("event", "page_view", template);
}
