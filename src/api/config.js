import query from "@/api/query";
import { getOptions } from "@/options";

export default (...args) => {
  const { config, includes } = getOptions();

  query("config", config.id, ...args);

  if (Array.isArray(includes)) {
    for (const domain of includes) {
      query("config", domain.id, ...args);
    }
  }
};
