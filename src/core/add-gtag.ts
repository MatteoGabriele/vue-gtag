import addConfiguration from "@/core/add-configuration";
import addRouterTracking from "@/core/add-router-tracking";
import { getSettings } from "@/core/settings";
import { hasGtag, injectScript } from "@/utils";

export async function addGtag(): Promise<void> {
  const { resource, dataLayerName, tagId, pageTracker, hooks } = getSettings();

  if (!tagId) {
    return;
  }

  addConfiguration();

  if (pageTracker?.router) {
    addRouterTracking();
  }

  if (hasGtag()) {
    hooks?.["script:loaded"]?.();
    return;
  }

  try {
    await injectScript(`${resource.url}?id=${tagId}&l=${dataLayerName}`, {
      preconnect: resource.preconnect,
      defer: resource.defer,
      nonce: resource.nonce,
    });

    hooks?.["script:loaded"]?.();
  } catch (error) {
    hooks?.["script:error"]?.(error);
  }
}
