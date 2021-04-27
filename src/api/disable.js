import { isBrowser } from "@/utils";
import { getOptions } from "@/options";

const disable = (value = true) => {
  if (!isBrowser()) {
    return;
  }

  const { config } = getOptions();

  window[`ga-disable-${config.id}`] = value;
};

export default disable;
