import linker from "@/gtag/linker";
import query from "@/gtag/query";
import { type ConfigParams, getSettings } from "@/settings";

function mergeDefaultConfig(config: ConfigParams = {}): ConfigParams {
  return {
    send_page_view: false,
    ...config,
  };
}

export default function addConfiguration() {
  const {
    tagId,
    config,
    linker: linkerOptions,
    additionalAccounts,
  } = getSettings();

  if (!tagId) {
    return;
  }

  if (linkerOptions) {
    linker(linkerOptions);
  }

  query("js", new Date());
  query("config", tagId, mergeDefaultConfig(config));

  if (!additionalAccounts) {
    return;
  }

  for (const account of additionalAccounts) {
    query("config", account.tagId, mergeDefaultConfig(account.config));
  }
}
