import { type Route, getSettings } from "../core/settings";
import type { GtagConfigParams } from "../types/gtag";
import query from "./query";

export type Pageview = GtagConfigParams;

export type PageviewParams = string | Route | Pageview;

function getPathWithBase(path: string, base: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}

export default function pageview(params: PageviewParams) {
  const { pageTracker } = getSettings();

  let template: PageviewParams | undefined;

  if (typeof params === "string") {
    template = {
      page_path: params,
    };
  } else if ("path" in params) {
    const base = pageTracker?.router.options.history.base ?? "";
    const path = pageTracker?.useRouteFullPath ? params.fullPath : params.path;

    template = {
      ...(params.name ? { page_title: params.name as string } : {}),
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

  query("event", "page_view", template);
}
