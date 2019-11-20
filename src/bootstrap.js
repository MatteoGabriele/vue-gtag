import { warn, loadScript } from "./util";
import { options } from "./install";
import pageTracker from "./page-tracker";

export default function() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const {
    config: { id, params },
    globalObjectName
  } = options;
  const url = `https://www.googletagmanager.com/gtag/js?id=${id}`;

  loadScript(url)
    .then(() => {
      window.dataLayer = window.dataLayer || [];
      window[globalObjectName] = function() {
        window.dataLayer.push(arguments);
      };

      window[globalObjectName]("js", new Date());
      window[globalObjectName]("config", id, params);

      if (options.pageTrackerEnabled) {
        pageTracker();
      }
    })
    .catch(() => {
      warn("Ops! Something happened and gtag.js couldn't be loaded");
    });
}
