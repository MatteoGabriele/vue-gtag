import addConfiguration from "./add-configuration";
import addRouterTracking from "./add-router-tracking";
import { getSettings } from "./settings";
import { injectScript } from "./utils";

export default async function addGtag(): Promise<void> {
  const { resource, dataLayerName, tagId, pageTracker, onReady, onError } =
    getSettings();

  if (!tagId) {
    return;
  }

  addConfiguration();

  if (pageTracker?.router) {
    addRouterTracking();
  }

  try {
    await injectScript(`${resource.url}?id=${tagId}&l=${dataLayerName}`, {
      preconnectOrigin: resource?.preconnect,
      defer: resource?.deferred,
    });

    onReady?.();
  } catch (error) {
    onError?.(error);
  }
}
