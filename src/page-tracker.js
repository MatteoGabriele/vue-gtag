import { getRouter, getOptions } from "./install";
import { isFn, warn } from "./util";
import pageview from "./api/pageview";
import screenview from "./api/screenview";

export const trackPage = (to, from) => {
  if (to.path === from.path) {
    return;
  }

  let template;
  const {
    pageTrackerTemplate,
    pageTrackerScreenviewEnabled,
    appName
  } = getOptions();

  const customTemplate = isFn(pageTrackerTemplate)
    ? pageTrackerTemplate(to, from)
    : null;

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
    warn("To use the screenview, add the appName to the plugin options");
    return;
  }

  if (pageTrackerScreenviewEnabled && !template.screen_name) {
    warn("To use the screenview, name your routes");
    return;
  }

  if (pageTrackerScreenviewEnabled) {
    screenview(template);
    return;
  }

  pageview(template);
};

export const init = Router => {
  /* istanbul ignore next */
  Router.onReady(() => {
    Router.afterEach(trackPage);
  });
};

export default () => {
  const Router = getRouter();

  if (!Router) {
    return;
  }

  init(Router);
};
