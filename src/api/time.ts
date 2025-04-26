import { event } from "@/api/event";
import type { GtagEventParams } from "@/types/gtag";

export function time(params: GtagEventParams) {
  event("timing_complete", params);
}
