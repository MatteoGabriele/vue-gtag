import linker from "@/api/linker";
import query from "@/api/query";
import { type ConfigParams, getSettings } from "@/settings";

function mergeDefaults(config: ConfigParams = {}): ConfigParams {
  return {
    send_page_view: false,
    ...config,
  };
}

export default function addConfiguration() {
  const {
    tagId,
    config,
    groupName,
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
  query("config", tagId, mergeDefaults(config));

  if (!additionalAccounts) {
    return;
  }

  for (const account of additionalAccounts) {
    query(
      "config",
      account.tagId,
      mergeDefaults({
        groups: groupName,
        ...account.config,
      }),
    );
  }
}
