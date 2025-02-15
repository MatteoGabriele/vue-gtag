import * as api from "@/api";
import { type RoutePath, type TrackingTemplate, getOptions } from "@/options";
import { validateScreenviewShape } from "@/utils";

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

  let template: TrackingTemplate = to;

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
