import event from "@/gtag/event";

export default function refund(params: Gtag.EventParams) {
  event("refund", params);
}
