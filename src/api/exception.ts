import event from "src/api/event";

export default (...args) => {
  event("exception", ...args);
};
