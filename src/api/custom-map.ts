import config from "@/api/config";

type CustomMapParams = Gtag.CustomParams;

export default function exception(params: CustomMapParams) {
  config({
    custom_map: params,
  });
}
