import query from "@/api/query";
import { getSettings } from "@/settings";
import type { Tail } from "@/types";

type ConfigParams = Tail<Gtag.GtagCommands["config"]>;

export default function config(...args: ConfigParams) {
  const { tagId, additionalAccounts } = getSettings();

  if (!tagId) {
    return;
  }

  query("config", tagId, ...args);

  if (!additionalAccounts) {
    return;
  }

  for (const account of additionalAccounts) {
    query("config", account.tagId, ...args);
  }
}
