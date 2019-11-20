import event from "./event";

export default (...args) => {
  event("purchase", ...args);
};
