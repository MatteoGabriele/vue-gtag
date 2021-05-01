import { getOptions } from "@/options";
import { warn, isFn } from "@/utils";
import * as api from "@/api";

export default (to = {}, from = {}) => {
  const {
    appName,
    pageTrackerTemplate,
    pageTrackerScreenviewEnabled,
    pageTrackerSkipSamePath,
  } = getOptions();

  let template = to;

  if (isFn(pageTrackerTemplate)) {
    template = pageTrackerTemplate(to, from);
  } else if (pageTrackerScreenviewEnabled) {
    warn(
      `Missing "appName" property inside the plugin options.`,
      appName == null
    );

    warn(
      `Missing "name" property in the route with path value "${to.path}".`,
      to.name == null
    );

    template = {
      app_name: appName,
      screen_name: to.name,
    };
  }

  if (pageTrackerSkipSamePath && to.path === from.path) {
    return;
  }

  if (pageTrackerScreenviewEnabled) {
    api.screenview(template);
    return;
  }

  api.pageview(template);
};
