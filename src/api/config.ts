import type { GtagCommands } from "src/types/gtag";
import { getSettings } from "../settings";
import type { Tail } from "../types/utils";
import query from "./query";

type ConfigParams = Tail<GtagCommands["config"]>;

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
