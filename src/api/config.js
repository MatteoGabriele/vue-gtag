import query from "@/api/query";
import options from "@/options";

const config = (...args) => {
  query("config", options.config.id, ...args);
};

export default config;
