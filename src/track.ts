import * as api from "@/api";
import { getOptions } from "@/options";
import { validateScreenviewShape } from "@/utils";
import type { RoutePath } from "./types";

export default (to: RoutePath, from: RoutePath) => {
  const {
    appName,
    pageTrackerTemplate: proxy,
    pageTrackerScreenviewEnabled: useScreenview,
    pageTrackerSkipSamePath: skipSamePath,
  } = getOptions();

  if (skipSamePath && to.path === from.path) {
    return;
  }

  let template: Gtag.ConfigParams = {
    page_location: to.path,
  };

  if (proxy) {
    template = proxy(to, from);
  } else if (useScreenview) {
    template = validateScreenviewShape({
      app_name: appName,
      screen_name: to.name,
    });
  }

  if (useScreenview) {
    api.screenview(template);
    return;
  }

  api.pageview(template);
};
