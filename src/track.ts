import { getOptions } from "src/options";
import { validateScreenviewShape, isFn } from "src/utils";
import * as api from "src/api";

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

  if (isFn(proxy)) {
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
