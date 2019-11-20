import event from "./event";

export default (...args) => {
  event("page_view", ...args);
};
