import { isBrowser, load } from "@/utils";
import registerGlobals from "@/register-globals";
import * as api from "@/api";
import pageTracker from "@/page-tracker";
import { getOptions } from "@/options";
import { getRouter } from "@/router";

const bootstrap = () => {
  if (!isBrowser()) {
    return;
  }

  const {
    onReady,
    onError,
    globalObjectName,
    globalDataLayerName,
    config,
    customResourceURL,
    customPreconnectOrigin,
    deferScriptLoad,
    pageTrackerEnabled,
    enabled,
    disableScriptLoad,
  } = getOptions();

  const isPageTrackerEnabled = Boolean(pageTrackerEnabled && getRouter());

  registerGlobals();

  if (!enabled) {
    api.optOut();
  }

  if (isPageTrackerEnabled) {
    pageTracker();
  } else {
    api.config(config.params);
  }

  if (disableScriptLoad) {
    return;
  }

  return load(`${customResourceURL}?id=${config.id}&l=${globalDataLayerName}`, {
    preconnectOrigin: customPreconnectOrigin,
    defer: deferScriptLoad,
  })
    .then(() => {
      if (onReady) {
        onReady(window[globalObjectName]);
      }
    })
    .catch((error) => {
      if (onError) {
        onError(error);
      }

      return error;
    });
};

export default bootstrap;
