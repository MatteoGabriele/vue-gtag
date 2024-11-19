import event from "src/api/event";

export default (...args) => {
  event("refund", ...args);
};
