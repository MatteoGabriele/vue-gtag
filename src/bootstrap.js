import { warn, isFn, loadScript } from "./util";
import { getOptions } from "../src/install";
import config from "./api/config";
import query from "./api/query";
import optOut from "./api/opt-out";
import pageTracker from "./page-tracker";

export default function() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const {
    enabled,
    globalObjectName,
    config: { id, params = {} },
    pageTrackerEnabled,
    onReady,
    disableScriptLoad
  } = getOptions();

  if (!enabled) {
    optOut();
  }

  window.dataLayer = window.dataLayer || [];
  window[globalObjectName] = function() {
    window.dataLayer.push(arguments);
  };

  query("js", new Date());
  config(params);

  if (pageTrackerEnabled) {
    pageTracker();
  }

  if (disableScriptLoad) {
    return;
  }

  const resource = `https://www.googletagmanager.com/gtag/js?id=${id}`;

  return loadScript(resource)
    .then(() => {
      const library = window[globalObjectName];

      if (isFn(onReady)) {
        onReady(library);
      }

      return library;
    })
    .catch(error => {
      warn("Ops! Something happened and gtag.js couldn't be loaded", error);
      return error;
    });
}
