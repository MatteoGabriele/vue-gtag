import { query } from "../query";

export type LinkerParams = {
  accept_incoming?: boolean;
  decorate_forms?: boolean;
  domains: string[];
  url_position?: "query" | "fragment";
};

export function linker(params: LinkerParams): void {
  query("set", "linker", params);
}
