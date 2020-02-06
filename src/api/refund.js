import event from "./event";

export default (...args) => {
  event("refund", ...args);
};
