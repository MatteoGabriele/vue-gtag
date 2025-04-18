import { addConfiguration } from "@/core/add-configuration";
import { addRouterTracking } from "@/core/add-router-tracking";
import { getSettings } from "@/core/settings";
import { injectScript } from "@/utils";

/**
 * Adds the Google Analytics gtag script to the application and initializes router
 * auto-tracking when enabled.
 */
export async function addGtag(): Promise<void> {
  const { resource, dataLayerName, tagId, pageTracker, hooks } = getSettings();

  if (!tagId) {
    return;
  }

  addConfiguration();

  if (pageTracker?.router) {
    addRouterTracking();
  }

  if (!resource.inject) {
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
