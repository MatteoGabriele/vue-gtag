import { getOptions } from "../install";

export default () => {
  const { config } = getOptions();
  window[`ga-disable-${config.id}`] = false;
};
