import type { GtagCustomParams } from "../../types/gtag";
import { event } from "../event";

type ExceptionParams =
  | {
      description?: string;
      fatal?: boolean;
    }
  | GtagCustomParams;

export function exception(params: ExceptionParams) {
  event("exception", params);
}
