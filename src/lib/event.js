import query from "./query";

export default (...args) => {
  query("event", ...args);
};
