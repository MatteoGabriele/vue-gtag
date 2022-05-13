import { utmSynapse } from "utm-synapse";

import { getOptions } from "@/options";
import { getRouter } from "@/router";
import { getPathWithBase, isBrowser } from "@/utils";
import event from "@/api/event";

export default (param) => {
  if (!isBrowser()) {
    return;
  }

  let template;

  const {
    pageTrackerUseFullPath: useFullPath,
    pageTrackerPrependBase: useBase,
    trackInitialUtmParams: trackInitialUtmParams,
  } = getOptions();

  if (typeof param === "string") {
    template = {
      page_path: param,
    };
  } else if (param.path || param.fullPath) {
    const router = getRouter();
    const base = router && router.options.base;
    const path = useFullPath ? param.fullPath : param.path;

    template = {
      ...(param.name && { page_title: param.name }),
      page_path: useBase ? getPathWithBase(path, base) : path,
    };
  } else {
    template = param;
  }

  if (trackInitialUtmParams) {
    const utmParams = utmSynapse.load();

    if (utmParams) {
      template.page_location = utmSynapse.setIntoUrl(
        window.location.href,
        utmParams
      );
      utmSynapse.clear();
    }
  }

  if (template.page_location == null) {
    template.page_location = window.location.href;
  }

  if (template.send_page_view == null) {
    template.send_page_view = true;
  }

  event("page_view", template);
};
