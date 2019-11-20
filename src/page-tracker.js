import { Router, options } from "./install";
import { isFunc } from "./util";
import config from "./lib/config";

export default () => {
  const { pageTrackerTemplate, pageTrackerShouldUpdate } = options;

  Router.onReady(() => {
    Router.afterEach((to, from) => {
      if (
        isFunc(pageTrackerShouldUpdate) &&
        !pageTrackerShouldUpdate(to, from)
      ) {
        return;
      }

      const template = isFunc(pageTrackerTemplate)
        ? pageTrackerTemplate(to, from)
        : {
            page_title: to.name,
            page_path: to.fullPath,
            page_location: window.location.href
          };

      config(template);
    });
  });
};
