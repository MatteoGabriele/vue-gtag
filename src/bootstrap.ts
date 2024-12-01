import { loadScript } from "./helper";
import { getOptions } from "./options";

const bootstrap = async (): Promise<void> => {
  const {
    configs,
    scriptResourceUrl,
    scriptDefer,
    scriptPreconnectOrigin,
    dataLayerName,
    onReady,
    onError,
  } = getOptions();

  if (!configs.length) {
    return;
  }

  const [config] = configs;

  try {
    await loadScript(
      `${scriptResourceUrl}?id=${config.targetId}&l=${dataLayerName}`,
      {
        preconnectOrigin: scriptPreconnectOrigin,
        defer: scriptDefer,
      },
    );

    onReady?.();
  } catch (error) {
    onError?.(error);
  }
};

export default bootstrap;
