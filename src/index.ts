import { type Config, updateConfig } from "@/config";
import initGtag from "@/init-gtag";

type CreateGtagConfig = Partial<Config> & Required<Pick<Config, "targetId">>;

export const createGtag = async (config: CreateGtagConfig): Promise<void> => {
  updateConfig(config);

  if (!config.enabled) {
    return;
  }

  const enabled =
    typeof config.enabled === "function"
      ? await config.enabled()
      : config.enabled;

  if (enabled) {
    initGtag();
  }
};
