import event from "@/api/event";

type ExceptionParams = Gtag.EventParams;

export default function exception(params: ExceptionParams) {
  event("exception", params);
}
