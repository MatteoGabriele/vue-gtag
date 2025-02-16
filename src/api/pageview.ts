import event from "@/api/event";
import { getOptions } from "@/options";
import { getRouter } from "@/router";
import type { RoutePath } from "@/types";
import { getPathWithBase, isBrowser } from "@/utils";

export default (param: string | RoutePath | Gtag.ConfigParams) => {
  if (!isBrowser()) {
    return;
  }

  let template: Gtag.ConfigParams;

  if (typeof param === "string") {
    template = {
      page_path: param,
    };
  } else if ("fullPath" in param && "path" in param) {
    const {
      pageTrackerUseFullPath: useFullPath,
      pageTrackerPrependBase: prependBase,
    } = getOptions();
    const router = getRouter();
    const base = router?.options.history.base;
    const path = useFullPath ? param.fullPath : param.path;

    template = {
      ...(param.name && { page_title: param.name as string }),
      page_path: prependBase ? getPathWithBase(path, base) : path,
    };
  } else {
    template = param;
  }

  if (template.page_location) {
    template.page_location = window.location.href;
  }

  if (template.send_page_view) {
    template.send_page_view = true;
  }

  event("page_view", template);
};
