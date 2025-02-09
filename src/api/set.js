import query from "@/api/query";

export default (...args) => {
  query("set", ...args);
};
