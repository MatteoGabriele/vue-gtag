import { event } from "@/api/event";
import type { GtagCustomParams } from "@/types/gtag";

type ExceptionParams =
  | {
      description?: string;
      fatal?: boolean;
    }
  | GtagCustomParams;

export function exception(params: ExceptionParams) {
  event("exception", params);
}
