import addConfiguration from "./add-configuration";
import addRouterTracking from "./add-router-tracking";
import { getSettings } from "./settings";
import { injectScript } from "./utils";

export default async function addGtag(): Promise<void> {
  const {
    useCustomScript,
    resource,
    dataLayerName,
    tagId,
    pageTracker,
    onReady,
    onError,
  } = getSettings();

  if (!tagId) {
    return;
  }

  addConfiguration();

  if (pageTracker?.router) {
    addRouterTracking();
  }

  if (useCustomScript) {
    onReady?.();
    return;
  }

  try {
    await injectScript(`${resource.url}?id=${tagId}&l=${dataLayerName}`, {
      preconnect: resource.preconnect,
      defer: resource.defer,
      nonce: resource.nonce,
    });

    onReady?.();
  } catch (error) {
    onError?.(error);
  }
}
