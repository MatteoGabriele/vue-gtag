import { type Config, updateConfig } from "@/config";
import initGtag from "@/init-gtag";

type CreateGtagConfig = Partial<Config> & Required<Pick<Config, "tagId">>;

export const createGtag = async (config: CreateGtagConfig): Promise<void> => {
  updateConfig(config);

  const enabled =
    typeof config.enabled === "function"
      ? await config.enabled()
      : config.enabled;

  if (!enabled) {
    return;
  }

  initGtag();
};
