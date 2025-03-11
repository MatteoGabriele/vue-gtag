import event from "@/api/event";

export default function time(params: Gtag.EventParams) {
  event("timing_complete", params);
}
