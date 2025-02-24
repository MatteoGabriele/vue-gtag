import { type Settings, updateSettings } from "@/config";
import initGtag from "@/init-gtag";

type PluginSettings = Partial<Settings> & Required<Pick<Settings, "tagId">>;

export const createGtag = async (settings: PluginSettings): Promise<void> => {
  updateSettings(settings);

  const enabled =
    typeof settings.enabled === "function"
      ? await settings.enabled()
      : settings.enabled;

  if (!enabled) {
    return;
  }

  initGtag();
};
