import event from "./event";

export default (...args) => {
  event("exception", ...args);
};
