import { warn, isFn, loadScript } from "./util";
import { getOptions } from "../src/install";
import optOut from "./api/opt-out";
import pageTracker from "./page-tracker";

export default function() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const {
    enabled,
    globalObjectName,
    globalDataLayerName,
    config: { id, params },
    includes,
    pageTrackerEnabled,
    onReady,
    disableScriptLoad
  } = getOptions();

  if (!enabled) {
    optOut();
  }

  if (window[globalObjectName] == null) {
    window[globalDataLayerName] = [];
    window[globalObjectName] = function() {
      window[globalDataLayerName].push(arguments);
    };
  }

  window[globalObjectName]("js", new Date());

  if (params) {
    window[globalObjectName]("config", id, params);
  } else {
    window[globalObjectName]("config", id);
  }

  if (Array.isArray(includes)) {
    includes.forEach(domain => {
      if (domain.params) {
        window[globalObjectName]("config", domain.id, domain.params);
      } else {
        window[globalObjectName]("config", domain.id);
      }
    });
  }

  if (pageTrackerEnabled) {
    pageTracker();
  }

  if (disableScriptLoad) {
    return;
  }

  const domain = "https://www.googletagmanager.com";
  const resource = `${domain}/gtag/js?id=${id}&l=${globalDataLayerName}`;

  return loadScript(resource, domain)
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
