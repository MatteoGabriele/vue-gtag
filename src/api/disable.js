import { isBrowser } from "@/utils";
import { getOptions } from "@/options";

const assignGlobalProperty = (id, value) => {
  if (!isBrowser()) {
    return;
  }

  window[`ga-disable-${id}`] = value;
};

export default (value = true) => {
  const { config, includes } = getOptions();

  assignGlobalProperty(config.id, value);

  if (Array.isArray(includes)) {
    includes.forEach((domain) => assignGlobalProperty(domain.id, value));
  }
};
