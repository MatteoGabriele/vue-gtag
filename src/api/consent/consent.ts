import { query } from "@/api/query";
import type { GtagConsentArg, GtagConsentParams } from "@/types/gtag";

export function consent(consentArg: GtagConsentArg, params: GtagConsentParams) {
  query("consent", consentArg, params);
}

export function consentGrantedAll(mode: GtagConsentArg = "default") {
  consent(mode, {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted",
  });
}

export function consentDeniedAll(mode: GtagConsentArg = "default") {
  consent(mode, {
    ad_user_data: "denied",
    ad_personalization: "denied",
    ad_storage: "denied",
    analytics_storage: "denied",
  });
}
