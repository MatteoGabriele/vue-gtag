import { getOptions } from "@/options";
import { isBrowser } from "@/utils";

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
    for (const domain of includes) {
      assignGlobalProperty(domain.id, value);
    }
  }
};
