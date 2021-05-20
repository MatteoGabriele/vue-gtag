import { isFunction } from "@vue/shared";
import { getOptions } from "@/options";
import { validateScreenviewShape } from "@/utils";
import * as api from "@/api";

export default (to = {}, from = {}) => {
  const {
    appName,
    pageTrackerTemplate: proxy,
    pageTrackerScreenviewEnabled: useScreenview,
    pageTrackerSkipSamePath: skipSamePath,
  } = getOptions();

  if (skipSamePath && to.path === from.path) {
    return;
  }

  let template = to;

  if (isFunction(proxy)) {
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
