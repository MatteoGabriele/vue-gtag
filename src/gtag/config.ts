import { getSettings } from "@/settings";
import type { Tail } from "@/types";
import query from "./query";

type ConfigParams = Tail<Gtag.GtagCommands["config"]>;

export default function config(...args: ConfigParams): void {
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
