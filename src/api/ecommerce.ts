import type { Ecommerce } from "@/types";
import event from "./event";

// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#refund
export default function refund(params: Ecommerce) {
  event("refund", params);
}
