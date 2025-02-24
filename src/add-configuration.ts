import query from "@/gtag/query";
import { getSettings } from "@/settings";

export default function addConfiguration(): void {
  const { tagId, config, additionalAccounts } = getSettings();

  if (!tagId) {
    return;
  }

  query("config", tagId, config);

  if (!additionalAccounts) {
    return;
  }

  for (const account of additionalAccounts) {
    query("config", account.tagId, account.config);
  }
}
