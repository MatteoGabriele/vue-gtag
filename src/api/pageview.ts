import query from "@/api/query";
import { getSettings } from "@/settings";
import type { Route } from "@/types";

export type Pageview = Gtag.ConfigParams;

export type PageviewParams = string | Route | Pageview;

type PageviewOptions = {
  useRouteFullPath?: boolean;
  useRouterBasePath?: boolean;
};

function getPathWithBase(path: string, base: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}

export default function pageview(
  params: PageviewParams,
  options?: PageviewOptions,
) {
  const { pageTracker } = getSettings();

  let template: PageviewParams = {};

  if (typeof params === "string") {
    template = {
      page_path: params,
    };
  } else if ("path" in params) {
    const base = pageTracker?.router.options.history.base ?? "";
    const path = options?.useRouteFullPath ? params.fullPath : params.path;

    template = {
      ...(params.name ? { page_title: params.name as string } : {}),
      page_path: options?.useRouterBasePath
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
    template.send_page_view = true;
  }

  query("event", "page_view", template);
}
