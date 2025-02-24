import { getSettings } from "@/settings";
import { injectScript } from "@/utils";
import addConfiguration from "./add-configuration";
import addRouterTracking from "./add-router-tracking";

export default async function start(): Promise<void> {
  const {
    resourceUrl,
    resourceUrlPreconnect,
    resourceDeferred,
    dataLayerName,
    tagId,
    router,
    onReady,
    onError,
  } = getSettings();

  if (!tagId) {
    return;
  }

  if (router) {
    addRouterTracking();
  } else {
    addConfiguration();
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
