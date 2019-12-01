import event from "./event";

export default (...args) => {
  event("screen_view", ...args);
};
