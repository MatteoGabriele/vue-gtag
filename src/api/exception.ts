import event from "@/api/event";

type ExceptionParams =
  | {
      description?: string;
      fatal?: boolean;
    }
  | Gtag.CustomParams;

export default function exception(params: ExceptionParams) {
  event("exception", params);
}
