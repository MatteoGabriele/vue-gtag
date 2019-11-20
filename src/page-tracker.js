import { Router, options } from "./install";
import { warn } from "./util";
import config from "./lib/config";
import screenview from "./lib/screenview";

export const trackPage = (to, from) => {
  if (to.path === from.path) {
    return;
  }

  let template;
  const {
    pageTrackerTemplate,
    pageTrackerScreenviewEnabled,
    appName
  } = options;
  const customTemplate = pageTrackerTemplate(to, from);

  if (customTemplate) {
    template = customTemplate;
  } else if (pageTrackerScreenviewEnabled) {
    template = {
      app_name: appName,
      screen_name: to.name
    };
  } else {
    template = {
      page_title: to.name,
      page_path: to.path,
      page_location: window.location.href
    };
  }

  if (pageTrackerScreenviewEnabled && !template.app_name) {
    warn(
      "To use the screenview feature, add the appName parameter to the plugin options"
    );
    return;
  }

  if (pageTrackerScreenviewEnabled && !template.screen_name) {
    warn("To use the screenview feature, name your routes");
    return;
  }

  if (pageTrackerScreenviewEnabled) {
    screenview(template);
    return;
  }

  config(template);
};

export default () => {
  Router.onReady(() => {
    Router.afterEach(trackPage);
  });
};
