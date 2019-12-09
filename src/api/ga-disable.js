import { getOptions } from "../install";

export default (value = true) => {
  const { config } = getOptions();
  window[`ga-disable-${config.id}`] = value;
};
