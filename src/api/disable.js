import { getOptions } from "@/options";

const disable = (value = true) => {
  const { config } = getOptions();

  window[`ga-disable-${config.id}`] = value;
};

export default disable;
