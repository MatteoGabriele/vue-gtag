import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import { addGtag } from "@/core/add-gtag";
import type { GtagConsentParams } from "@/types/gtag";
import { isServer, removeCookies } from "@/utils";
import { type Ref, computed } from "vue";

export type UseWithConsentReturn = {
  hasConsent: Ref<boolean>;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptCustom: (params: GtagConsentParams) => void;
};

const GA_COOKIE_VALUE = "_ga";

/**
 * Provides functionality to manage user consent.
 * @remark Make sure to set `initMode` to `manual`
 */
export function useConsent(): UseWithConsentReturn {
  const hasConsent = computed<boolean>(() => {
    return isServer() ? false : document.cookie.includes(GA_COOKIE_VALUE);
  });

  const acceptAll = async () => {
    await addGtag();
    consentGrantedAll("update");
    window.location.reload();
  };

  const rejectAll = async () => {
    consentDeniedAll("update");
    await removeCookies(GA_COOKIE_VALUE);
    window.location.reload();
  };

  const acceptCustom = async (params: GtagConsentParams) => {
    await addGtag();
    consent("update", params);
    window.location.reload();
  };

  if (hasConsent.value) {
    addGtag();
  }

  return {
    hasConsent,
    acceptAll,
    rejectAll,
    acceptCustom,
  };
}
