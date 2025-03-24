import type {
  GtagEcommerceEventNames,
  GtagEcommerceParams,
} from "../../types/gtag";
import { event } from "../event";

/**
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#refund
 */
export function ecommerce(
  name: GtagEcommerceEventNames,
  params: GtagEcommerceParams,
): void {
  event(name, params);
}
