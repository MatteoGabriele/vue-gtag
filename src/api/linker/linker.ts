import { query } from "@/api/query";

export type LinkerParams = {
  accept_incoming?: boolean;
  decorate_forms?: boolean;
  domains: string[];
  url_position?: "query" | "fragment";
};

export function linker(params: LinkerParams) {
  query("set", "linker", params);
}
