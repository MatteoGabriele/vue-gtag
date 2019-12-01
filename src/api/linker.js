import event from "./event";

export default (...args) => {
  event("linker", ...args);
};
