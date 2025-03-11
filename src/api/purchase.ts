import event from "@/api/event";

export default function purchase(params: Gtag.EventParams) {
  event("purchase", params);
}
