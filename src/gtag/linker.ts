import query from "@/gtag/query";

export type LinkerParams = {
  accept_incoming?: boolean;
  decorate_forms?: boolean;
  domains: string[];
  url_position?: "query" | "fragment";
};

// https://developers.google.com/tag-platform/devguides/cross-domain
export default function linker(params: LinkerParams) {
  const linkerParams: LinkerParams = {
    decorate_forms: false,
    url_position: "query",
    ...params,
  };

  if (
    linkerParams?.domains?.length &&
    linkerParams.accept_incoming === undefined
  ) {
    linkerParams.accept_incoming = true;
  }

  query("set", "linker", linkerParams);
}
