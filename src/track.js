import { getOptions } from "@/options";
import { validateScreenviewShape, isFn } from "@/utils";
import * as api from "@/api";

export default (to = {}, from = {}) => {
  const {
    appName,
    pageTrackerTemplate: proxy,
    pageTrackerScreenviewEnabled: useScreenview,
    pageTrackerSkipSamePath: skipSamePath,
  } = getOptions();

  if (skipSamePath && to.path === from.path) {
    return;
  }

  let template = to;

  if (isFn(proxy)) {
    template = proxy(to, from);
  } else if (useScreenview) {
    template = validateScreenviewShape({
      app_name: appName,
      screen_name: to.name,
    });
  }

  if (useScreenview) {
    api.screenview(template);
    return;
  }

  const { query } = to;
  let utm = {};
  for (let key in query) {
    if (key.match(/^utm_/)) {
      utm[key.split("_")[1]] = query[key];
    }
  }

  if (Object.keys(utm).length) {
    // we have utm params, let's save them in local storage
    localStorage.setItem("vue_gtag_utm", JSON.stringify(utm));
  } else {
    // we don't have utm params, let's check local storage
    utm = JSON.parse(localStorage.getItem("vue_gtag_utm") || "{}");
  }

  api.pageview(template, utm);
};
