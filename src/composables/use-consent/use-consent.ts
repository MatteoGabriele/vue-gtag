import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import { addGtag } from "@/core/add-gtag";
import type { GtagConsentParams } from "@/types/gtag";
import { isServer } from "@/utils";
import { type Ref, ref } from "vue";

export type UseWithConsentReturn = {
  hasConsent: Ref<boolean>;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptCustom: (params: GtagConsentParams) => void;
};

const GA_COOKIE_VALUE = "_ga";

export function useConsent(): UseWithConsentReturn {
  const hasConsent = ref<boolean>(
    isServer() ? false : document.cookie.includes(GA_COOKIE_VALUE),
  );

  const acceptAll = async () => {
    await addGtag();
    consentGrantedAll("update");
    window.location.reload();
  };

  const rejectAll = () => {
    consentDeniedAll("update");
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
