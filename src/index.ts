import addGtag from "@/add-gtag";
import { type Settings, updateSettings } from "@/settings";

type AppSettings = Partial<Settings> & Required<Pick<Settings, "tagId">>;

export const createGtag = async (settings: AppSettings): Promise<void> => {
  updateSettings(settings);

  const enabled =
    typeof settings.enabled === "function"
      ? await settings.enabled()
      : settings.enabled;

  if (!enabled) {
    return;
  }

  return addGtag();
};

export { default as useGtag } from "@/composable/use-gtag";
export * from "@/api";
