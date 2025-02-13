import event from "@/api/event";
import { getOptions } from "@/options";

export default (param) => {
  const { appName } = getOptions();

  if (!param) {
    return;
  }

  let template;

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
