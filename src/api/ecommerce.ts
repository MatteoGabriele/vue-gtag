import type { EcommerceEventName, EcommerceParams } from "../types/ecommerce";
import event from "./event";

/**
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#refund
 */
export default function ecommerce(
  name: EcommerceEventName,
  params: EcommerceParams,
) {
  event(name, params);
}
