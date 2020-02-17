import event from "./event";

export default (...args) => {
  const [arg] = args;
  let params = {};

  if (typeof arg === "string") {
    params = {
      page_path: arg,
      page_location: window.location.href
    };
  } else {
    params = arg;
  }

  event("page_view", params);
};
