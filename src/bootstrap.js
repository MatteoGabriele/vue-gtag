import { warn, loadScript } from "./util";
import { options } from "./install";
import pageTracker from "./page-tracker";

export default function() {
  const {
    config: { id, params }
  } = options;
  const url = `https://www.googletagmanager.com/gtag/js?id=${id}`;

  loadScript(url)
    .then(() => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", id, params);

      if (options.pageTrackerEnabled) {
        pageTracker();
      }
    })
    .catch(() => {
      warn("Ops! Something happened and gtag.js couldn't be loaded");
    });
}
