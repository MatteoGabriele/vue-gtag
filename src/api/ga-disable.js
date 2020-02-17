import { getOptions } from "../install";

export default (value = true) => {
  const { includes, config } = getOptions();

  window[`ga-disable-${config.id}`] = value;

  includes.forEach(domain => {
    window[`ga-disable-${domain.id}`] = value;
  });
};
