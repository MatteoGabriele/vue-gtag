import { getOptions } from "../install";

export default (value = true) => {
  const { includes, config } = getOptions();

  window[`ga-disable-${config.id}`] = value;

  if (Array.isArray(includes)) {
    includes.forEach(domain => {
      window[`ga-disable-${domain.id}`] = value;
    });
  }
};
