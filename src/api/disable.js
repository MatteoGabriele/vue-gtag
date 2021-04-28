import { isBrowser } from "@/utils";
import { getOptions } from "@/options";

export default (value = true) => {
  if (!isBrowser()) {
    return;
  }

  const { config } = getOptions();

  window[`ga-disable-${config.id}`] = value;
};
