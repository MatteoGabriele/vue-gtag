import { loadScript } from "src/helper";
import { options } from "src/options";
import api from "src/api";

const configureInitialScript = async () => {
  const {
    configs,
    scriptResourceUrl,
    scriptDefer,
    scriptPreconnectOrigin,
    dataLayerName,
    onReady,
    onError,
  } = options;

  if (configs.length === 0) {
    return;
  }

  api.query("js", new Date());

  configs.forEach((item) => {
    const params = { send_page_view: false, ...item.params };
    api.query("config", item.targetId, params);
  });

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

export default configureInitialScript;
