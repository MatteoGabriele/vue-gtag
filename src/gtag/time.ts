import event from "@/gtag/event";

export default function time(params: Gtag.EventParams) {
  event("timing_complete", params);
}
