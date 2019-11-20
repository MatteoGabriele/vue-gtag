import query from "./query";

export default (...args) => {
  query("set", ...args);
};
