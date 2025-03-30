import { query } from "@/api/query";
import { set } from "@/api/set";
import { type Route, getSettings } from "@/core/settings";
import type { GtagConfigParams } from "@/types/gtag";

export type Pageview = GtagConfigParams;

export type PageviewParams = string | Route | Pageview;

function getPathWithBase(path: string, base: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}

export function pageview(params: PageviewParams) {
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

  if (template.page_path !== "/" && template.page_path?.endsWith("/")) {
    template.page_path = template.page_path.slice(0, -1);
  }

  if (template.page_location.match(/utm_/)) {
    const url = new URL(template.page_location);
    const utmParams = Object.fromEntries(url.searchParams.entries());

    url.search = "";
    template.page_location = url.toString();

    set("campaign", utmParams);
  }

  query("event", "page_view", template);
}
