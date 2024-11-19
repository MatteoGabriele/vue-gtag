import event from "src/api/event";

export default (params) => {
  event("timing_complete", params);
};
