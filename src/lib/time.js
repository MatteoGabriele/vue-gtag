import event from "./event";

export default (...args) => {
  event("timing_complete", ...args);
};
