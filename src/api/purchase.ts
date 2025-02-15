import event from "@/api/event";

export default (params) => {
  event("purchase", params);
};
