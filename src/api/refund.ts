import event from "@/api/event";

export default function refund(params: Gtag.EventParams) {
  event("refund", params);
}
