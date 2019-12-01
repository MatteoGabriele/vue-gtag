import query from "./query";
import { getOptions } from "../install";

export default (...args) => {
  const options = getOptions();
  query("config", options.config.id, ...args);
};
