import { consentDeniedAll, consentGrantedAll } from "./api/consent";
import linker from "./api/linker";
import query from "./api/query";
import { getSettings } from "./settings";
import type { GtagConfig } from "./types/gtag";

function mergeDefaults(config: GtagConfig = {}): GtagConfig {
  return {
    send_page_view: false,
    anonymize_ip: true,
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
    hooks,
    consentMode,
  } = getSettings();

  if (!tagId) {
    return;
  }

  hooks?.["config:init:before"]?.();

  if (consentMode === "granted") {
    consentGrantedAll();
  } else if (consentMode === "denied") {
    consentDeniedAll();
  }

  if (linkerOptions) {
    linker(linkerOptions);
  }

  query("js", new Date());
  query("config", tagId, mergeDefaults(config));

  if (additionalAccounts) {
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

  hooks?.["config:init:after"]?.();
}
