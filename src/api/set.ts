import query from "src/api/query";

export default (...args) => {
  query("set", ...args);
};
