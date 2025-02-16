import event from "@/api/event";
import { getOptions } from "@/options";

export default (
  param: string | Gtag.EventParams | Gtag.CustomParams | Gtag.ConfigParams,
) => {
  const { appName } = getOptions();

  if (!param) {
    return;
  }

  let template: Gtag.CustomParams;

  if (typeof param === "string") {
    template = {
      screen_name: param,
    };
  } else {
    template = param;
  }

  template.app_name = template.app_name || appName;

  event("screen_view", template);
};
