import addGtag from "./add-gtag";
import { type PluginSettings, updateSettings } from "./settings";

export default function createGtag(settings: PluginSettings): Promise<void> {
  updateSettings(settings);
  return addGtag();
}
