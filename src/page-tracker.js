import { getRouter } from "@/router";
import { getOptions } from "@/options";
import * as api from "@/api";

const pageTracker = () => {
  const router = getRouter();
  const {
    config,
    appName,
    pageTrackerTemplate,
    pageTrackerScreenviewEnabled,
    pageTrackerUseFullPath,
  } = getOptions();

  router.onReady(() => {
    api.config(config.params);

    let template;

    if (typeof pageTrackerTemplate === "function") {
      template = pageTrackerTemplate(router.currentRoute);
    } else if (pageTrackerScreenviewEnabled) {
      template = {
        app_name: appName,
        screen_name: router.currentRoute.name,
      };
    } else {
      template = {
        page_title: router.currentRoute.name,
        page_path: pageTrackerUseFullPath
          ? router.currentRoute.fullPath
          : router.currentRoute.path,
        page_location: window.location.href,
      };
    }

    if (pageTrackerScreenviewEnabled) {
      api.screenview(template);
    } else {
      api.pageview(template);
    }
  });
};

export default pageTracker;
