import { getOptions } from "@/options";
import { warn, isFn } from "@/utils";
import * as api from "@/api";

export default (to = {}, from = {}) => {
  const {
    appName,
    pageTrackerTemplate,
    pageTrackerScreenviewEnabled,
    pageTrackerUseFullPath,
    pageTrackerSkipSamePath,
  } = getOptions();

  let template;

  if (isFn(pageTrackerTemplate)) {
    template = pageTrackerTemplate(to, from);
  } else if (pageTrackerScreenviewEnabled) {
    warn(`Missing "appName" value inside the plugin options.`, appName == null);

    template = {
      app_name: appName,
      screen_name: to.name,
    };
  } else {
    warn(
      `The route with path value "${to.path}" doesn't have a name.`,
      to.name == null
    );

    template = {
      page_title: to.name,
      page_path: pageTrackerUseFullPath ? to.fullPath : to.path,
      page_location: window.location.href,
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
