import { options } from "../install";

export default () => {
  window[`ga-disable-${options.config.id}`] = false;
};
