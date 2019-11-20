import query from "./query";
import { options } from "../install";

export default (...args) => {
  query("config", options.id, ...args);
};
