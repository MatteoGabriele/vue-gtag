import event from "@/api/event";

export default (params) => {
  event("timing_complete", params);
};
