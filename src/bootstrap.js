import { warn, loadScript } from "./util";
import { options } from "./install";
import optOut from "./lib/opt-out";
import pageTracker from "./page-tracker";

export default function() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const { config, globalObjectName, enabled, ready } = options;
  const url = `https://www.googletagmanager.com/gtag/js?id=${config.id}`;

  loadScript(url)
    .then(() => {
      if (!enabled) {
        optOut();
      }

      window.dataLayer = window.dataLayer || [];
      window[globalObjectName] = function() {
        window.dataLayer.push(arguments);
      };

      window[globalObjectName]("js", new Date());
      window[globalObjectName]("config", config.id, config.params);

      if (options.pageTrackerEnabled) {
        pageTracker();
      }

      ready(window[globalObjectName])
    })
    .catch((e) => {
      warn("Ops! Something happened and gtag.js couldn't be loaded", e);
    });
}
