import config from "@/api/config";

type CustomMapParams = Gtag.CustomParams;

export default function customMap(params: CustomMapParams) {
  config({
    custom_map: params,
  });
}
