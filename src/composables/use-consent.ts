import { type Ref, ref } from "vue";
import { consent, consentDeniedAll, consentGrantedAll } from "../api/consent";
import addGtag from "../core/add-gtag";
import { type PluginSettings, updateSettings } from "../core/settings";
import type { GtagConsentParams } from "../types/gtag";
import { isServer } from "../utils";

export type UseWithConsentReturn = {
  hasConsent: Ref<boolean>;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptCustom: (params: GtagConsentParams) => void;
};

const GA_COOKIE_VALUE = "_ga";

export function useConsent(settings: PluginSettings): UseWithConsentReturn {
  const createGtag = (): Promise<void> => {
    updateSettings({ consentMode: "denied", ...settings });
    return addGtag();
  };

  const hasConsent = ref<boolean>(
    isServer() ? false : document.cookie.includes(GA_COOKIE_VALUE),
  );

  const acceptAll = async () => {
    await createGtag();
    consentGrantedAll("update");
    window.location.reload();
  };

  const rejectAll = () => {
    consentDeniedAll("update");
  };

  const acceptCustom = async (params: GtagConsentParams) => {
    await createGtag();
    consent("update", params);
    window.location.reload();
  };

  if (hasConsent.value) {
    createGtag();
  }

  return {
    hasConsent,
    acceptAll,
    rejectAll,
    acceptCustom,
  };
}
