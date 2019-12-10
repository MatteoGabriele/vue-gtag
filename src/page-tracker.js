import { getRouter, getOptions } from "./install";
import { warn } from "./util";
import pageview from "./api/pageview";
import screenview from "./api/screenview";

export const trackPage = (to, from) => {
  if (to.path === from.path) {
    return;
  }

  const {
    pageTrackerTemplate,
    pageTrackerScreenviewEnabled,
    appName
  } = getOptions();

  let template;
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
  const { onBeforeTrack, onAfterTrack } = getOptions();

  /* istanbul ignore next */
  Router.onReady(() => {
    Router.afterEach((to, from) => {
      onBeforeTrack(to, from);
      trackPage(to, from);
      onAfterTrack(to, from);
    });
  });
};

export default () => {
  const Router = getRouter();

  if (!Router) {
    return;
  }

  init(Router);
};
