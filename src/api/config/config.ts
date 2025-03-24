import { getSettings } from "../../settings";
import type { GtagConfig } from "../../types/gtag";
import { query } from "../query";

export function config(params: GtagConfig): void {
  const { tagId, additionalAccounts } = getSettings();

  if (!tagId) {
    return;
  }

  query("config", tagId, params);

  if (!additionalAccounts) {
    return;
  }

  for (const account of additionalAccounts) {
    query("config", account.tagId, params);
  }
}
