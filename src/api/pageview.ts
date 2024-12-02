import { options } from "src/options";
import event from "./event";
import { getPathWithBase } from "src/helper";
import { Route } from "src/router";

type PageviewParam = Gtag.ConfigParams | Route | string;

const pageview = (param: PageviewParam) => {
  const { router, routerOptions } = options;

  let template: Gtag.ConfigParams;

  if (typeof param === "string") {
    template = {
      page_path: param,
    };
  } else if ("path" in param && "fullPath" in param) {
    const path = routerOptions?.useFullPath ? param.fullPath : param.path;
    const base = router?.options.history.base;
    const title = param.name as string;

    template = {
      page_title: title,
      page_path: routerOptions?.prependBase
        ? getPathWithBase(path, base)
        : path,
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

export default pageview;
