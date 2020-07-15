import query from "./query";
import { getOptions } from "../install";

export default (...args) => {
  const { config, includes } = getOptions();

  query("config", config.id, ...args);

  if (Array.isArray(includes)) {
    includes.forEach((domain) => {
      query("config", domain.id, ...args);
    });
  }
};
