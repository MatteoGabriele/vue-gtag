import { warn, loadScript } from "./util";
import pageTracker from "./page-tracker";

export default function({
  enabled,
  globalObjectName,
  pageTrackerEnabled,
  config
} = {}) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  if (!enabled) {
    window[`ga-disable-${config.id}`] = true;
  }

  window.dataLayer = window.dataLayer || [];
  window[globalObjectName] = function() {
    window.dataLayer.push(arguments);
  };

  window[globalObjectName]("js", new Date());
  window[globalObjectName]("config", config.id, config.params);

  if (pageTrackerEnabled) {
    pageTracker();
  }

  loadScript(`https://www.googletagmanager.com/gtag/js?id=${config.id}`).catch(
    error => {
      warn("Ops! Something happened and gtag.js couldn't be loaded", error);
    }
  );
}
