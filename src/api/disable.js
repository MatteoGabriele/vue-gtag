import { isBrowser } from "@/utils";
import { getOptions } from "@/options";

const assignGlobalProperty = (id, value) => {
  window[`ga-disable-${id}`] = value;
};

export default (value = true) => {
  if (!isBrowser()) {
    return;
  }

  const { config, includes } = getOptions();

  assignGlobalProperty(config.id, value);

  if (Array.isArray(includes)) {
    includes.forEach((domain) => assignGlobalProperty(domain.id, value));
  }
};
