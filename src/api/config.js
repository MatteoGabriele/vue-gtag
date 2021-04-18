import query from "@/api/query";
import { getOptions } from "@/options";

const config = (...args) => {
  const { config } = getOptions();

  query("config", config.id, ...args);
};

export default config;
