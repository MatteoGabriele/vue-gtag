import { loadScript } from "src/helper";
import { options } from "src/options";
import { addRoutesTracker } from "src/router";

const bootstrap = async (): Promise<void> => {
  const {
    configs,
    scriptResourceUrl,
    scriptDefer,
    scriptPreconnectOrigin,
    dataLayerName,
    onReady,
    onError,
  } = options;

  addRoutesTracker();

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
