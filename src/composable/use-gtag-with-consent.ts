import { type Ref, ref } from "vue";
import consent, { consentDeniedAll, consentGrantedAll } from "../api/consent";
import createGtag from "../create-gtag";
import type { PluginSettings } from "../settings";
import type { GtagConsentParams } from "../types/gtag";

export type UseWithConsentReturn = {
  hasConsent: Ref<boolean>;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptCustom: (params: GtagConsentParams) => void;
};

const GA_COOKIE_VALUE = "_ga";

export default function useGtagWithConsent(
  settings: PluginSettings,
): UseWithConsentReturn {
  const initialize = (): Promise<void> => {
    return createGtag({ consentMode: "denied", ...settings });
  };

  const hasConsent = ref<boolean>(document.cookie.includes(GA_COOKIE_VALUE));

  const acceptAll = async () => {
    await initialize();
    consentGrantedAll("update");
    window.location.reload();
  };

  const rejectAll = () => {
    consentDeniedAll("update");
  };

  const acceptCustom = async (params: GtagConsentParams) => {
    await initialize();
    consent("update", params);
    window.location.reload();
  };

  if (hasConsent.value) {
    initialize();
  }

  return {
    hasConsent,
    acceptAll,
    rejectAll,
    acceptCustom,
  };
}
