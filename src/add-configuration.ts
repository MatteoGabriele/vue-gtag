import query from "@/gtag/query";
import { getConfig } from "./config";

export default function addConfiguration(): void {
  const { tagId, config, domains } = getConfig();

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
