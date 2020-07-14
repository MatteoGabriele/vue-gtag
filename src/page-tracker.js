import { getVue, getRouter, getOptions } from "./install";
import { warn } from "./util";
import pageview from "./api/pageview";
import screenview from "./api/screenview";

export const getPageviewTemplate = (to = {}, from = {}) => {
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

  return template;
};

export const trackPage = ({ to = {}, from = {}, params = {} } = {}) => {
  const {
    pageTrackerSkipSamePath,
    pageTrackerScreenviewEnabled
  } = getOptions();

  if (pageTrackerSkipSamePath && to.path === from.path) {
    return;
  }

  const newParams = {
    ...getPageviewTemplate(to, from),
    ...params
  };

  if (pageTrackerScreenviewEnabled && !newParams.app_name) {
    warn("To use the screenview, add the appName to the plugin options");
    return;
  }

  if (pageTrackerScreenviewEnabled && !newParams.screen_name) {
    warn("To use the screenview, name your routes");
    return;
  }

  if (pageTrackerScreenviewEnabled) {
    screenview(newParams);
    return;
  }

  pageview(newParams);
};

export const startRouter = Router => {
  const Vue = getVue();
  const { onBeforeTrack, onAfterTrack, config } = getOptions();

  /* istanbul ignore next */
  Router.onReady(current => {
    Vue.nextTick().then(() => {
      trackPage({ to: current, params: config.params });
    });

    Router.afterEach((to, from) => {
      Vue.nextTick().then(() => {
        onBeforeTrack(to, from);
        trackPage({ to, from });
        onAfterTrack(to, from);
      });
    });
  });
};

export const autotrack = () => {
  const Router = getRouter();

  if (!Router) {
    return;
  }

  startRouter(Router);
};

export default autotrack;
