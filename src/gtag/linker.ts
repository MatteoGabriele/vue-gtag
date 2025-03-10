import query from "@/gtag/query";

export type LinkerParams = {
  accept_incoming?: boolean;
  decorate_forms?: boolean;
  domains: string[];
  url_position?: "query" | "fragment";
};

export default function linker(params: LinkerParams) {
  query("set", "linker", params);
}
