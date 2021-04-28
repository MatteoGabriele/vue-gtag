import event from "@/api/event";

export default (...args) => {
  event("exception", ...args);
};
