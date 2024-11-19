import { load } from "src/utils";
import registerGlobals from "src/register-globals";
import addRoutesTracker from "src/add-routes-tracker";
import { getOptions } from "src/options";
import { getRouter } from "src/router";
import addConfiguration from "src/add-configuration";

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
