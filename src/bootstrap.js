import { isBrowser, load } from "@/utils";
import registerGlobals from "@/register-globals";
import * as api from "@/api";
import addRoutesTracker from "@/add-routes-tracker";
import { getOptions } from "@/options";
import { getRouter } from "@/router";
import addConfiguration from "@/add-configuration";

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
    addRoutesTracker();
  } else {
    addConfiguration();
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
