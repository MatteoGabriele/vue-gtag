import { getConfig } from "@/config";
import { injectScript } from "@/utils";

export default async function start(): Promise<void> {
  const {
    resourceUrl,
    resourceUrlPreconnect,
    resourceDeferred,
    dataLayerName,
    targetId,
    onReady,
    onError,
  } = getConfig();

  try {
    await injectScript(`${resourceUrl}?id=${targetId}&l=${dataLayerName}`, {
      preconnectOrigin: resourceUrlPreconnect,
      defer: resourceDeferred,
    });

    onReady?.();
  } catch (error) {
    onError?.(error);
  }
}
