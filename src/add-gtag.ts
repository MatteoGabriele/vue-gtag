import { getSettings } from "@/settings";
import { injectScript } from "@/utils";
import addConfiguration from "./add-configuration";
import addRouterTracking from "./add-router-tracking";

export default async function addGtag(): Promise<void> {
  const {
    resourceUrl,
    resourceUrlPreconnect,
    resourceDeferred,
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

  try {
    await injectScript(`${resourceUrl}?id=${tagId}&l=${dataLayerName}`, {
      preconnectOrigin: resourceUrlPreconnect,
      defer: resourceDeferred,
    });

    onReady?.();
  } catch (error) {
    onError?.(error);
  }
}
