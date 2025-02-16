import addConfiguration from "@/add-configuration";
import addRoutesTracker from "@/add-routes-tracker";
import { type GtagOptions, getOptions } from "@/options";
import registerGlobals from "@/register-globals";
import { getRouter } from "@/router";
import { load } from "@/utils";

declare global {
  interface Window {
    [gtag: GtagOptions["globalObjectName"]]: Gtag.Gtag;
  }
}

export default () => {
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
    disableScriptLoad,
  } = getOptions();

  if (config == null) {
    return;
  }

  const isPageTrackerEnabled = Boolean(pageTrackerEnabled && getRouter());

  registerGlobals();

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
      onReady?.(window[globalObjectName]);
    })
    .catch((error: Error) => {
      onError?.(error);

      return error;
    });
};
