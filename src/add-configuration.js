import * as api from "@/api";
import { getOptions } from "@/options";

const mergeDefaultParams = (params) => ({
  send_page_view: false,
  ...params,
});

export default () => {
  const { config, includes } = getOptions();

  api.query("config", config.id, mergeDefaultParams(config.params));

  if (Array.isArray(includes)) {
    includes.forEach((domain) => {
      api.query("config", domain.id, mergeDefaultParams(domain.params));
    });
  }
};
