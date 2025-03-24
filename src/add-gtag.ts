import addConfiguration from "./add-configuration";
import addRouterTracking from "./add-router-tracking";
import { getSettings } from "./settings";
import { hasGtag, injectScript } from "./utils";

export default async function addGtag(): Promise<void> {
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
      preconnect: resource.preconnect ?? false,
      defer: resource.defer ?? false,
      nonce: resource.nonce ?? "",
    });

    hooks?.["script:loaded"]?.();
  } catch (error) {
    hooks?.["script:error"]?.(error);
  }
}
