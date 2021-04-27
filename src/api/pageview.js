import event from "@/api/event";

export default (...args) => {
  const [firstArgument] = args;
  let params;

  if (typeof firstArgument === "string") {
    params = {
      page_path: firstArgument,
      page_location: window.location.href,
    };
  } else if (firstArgument.matched) {
    params = {
      page_path: firstArgument.path,
      page_title: firstArgument.name,
      page_location: window.location.href,
    };
  } else {
    params = { ...firstArgument };
  }

  if (params.send_page_view == null) {
    params.send_page_view = true;
  }

  event("page_view", params);
};
