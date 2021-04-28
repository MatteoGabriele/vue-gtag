import event from "@/api/event";

export default (...args) => {
  event("refund", ...args);
};
