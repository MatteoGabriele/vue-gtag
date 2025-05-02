import { event } from "@/api/event";
import type {
  GtagEcommerceEventNames,
  GtagEcommerceParams,
} from "@/types/gtag";

export function ecommerce(
  name: GtagEcommerceEventNames,
  params: GtagEcommerceParams,
) {
  event(name, params);
}
