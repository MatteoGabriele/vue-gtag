import { getOptions } from "@/options";
import { isBrowser } from "@/utils";
import event from "@/api/event";

export default (param) => {
  if (!isBrowser()) {
    return;
  }

  let template;

  if (typeof param === "string") {
    template = {
      page_path: param,
    };
  } else if (param.path || param.fullPath) {
    const { pageTrackerUseFullPath } = getOptions();

    template = {
      ...(param.name && { page_title: param.name }),
      page_path: pageTrackerUseFullPath ? param.fullPath : param.path,
    };
  } else {
    template = param;
  }

  if (template.page_location == null) {
    template.page_location = window.location.href;
  }

  if (template.send_page_view == null) {
    template.send_page_view = true;
  }

  event("page_view", template);
};
