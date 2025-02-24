import query from "@/gtag/query";
import { getSettings } from "./config";

export default function addConfiguration(): void {
  const { tagId, config, domains } = getSettings();

  if (!tagId) {
    return;
  }

  query("config", tagId, config);

  if (!domains) {
    return;
  }

  for (const domain of domains) {
    query("config", domain.tagId, domain.config);
  }
}
