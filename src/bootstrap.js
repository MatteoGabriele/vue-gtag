import { isFn, loadScript } from "./util";
import api from "./api";
import { getRouter, getOptions } from "../src/install";
import optOut from "./api/opt-out";
import pageTracker from "./page-tracker";

export default function () {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const {
    customResourceURL,
    customPreconnectOrigin,
    enabled,
    globalObjectName,
    globalDataLayerName,
    config,
    pageTrackerEnabled,
    onReady,
    onError,
    deferScriptLoad,
    disableScriptLoad,
  } = getOptions();

  const Router = getRouter();
  const isPageTrackerEnabled = Boolean(pageTrackerEnabled && Router);

  if (!enabled) {
    optOut();
  }

  if (window[globalObjectName] == null) {
    window[globalDataLayerName] = window[globalDataLayerName] || [];
    window[globalObjectName] = function () {
      window[globalDataLayerName].push(arguments);
    };
  }

  window[globalObjectName]("js", new Date());

  if (isPageTrackerEnabled) {
    pageTracker();
  } else {
    api.config(config.params);
  }

  if (disableScriptLoad) {
    return;
  }

  const resource = `${customResourceURL}?id=${config.id}&l=${globalDataLayerName}`;

  return loadScript(resource, {
    preconnectOrigin: customPreconnectOrigin,
    defer: deferScriptLoad,
  })
    .then(() => {
      const library = window[globalObjectName];

      if (isFn(onReady)) {
        onReady(library);
      }

      return library;
    })
    .catch((error) => {
      if (isFn(onError)) {
        onError(error);
      }

      return error;
    });
}
