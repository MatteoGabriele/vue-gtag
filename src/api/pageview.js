import event from "@/api/event";

export default (param) => {
  let template;

  if (typeof param === "string") {
    template = {
      page_path: param,
    };
  } else if (param.matched) {
    // I'd love to find another way to understand that this is a route object
    template = {
      page_path: param.path,
      page_title: param.name,
    };
  } else {
    template = param;
  }

  if (template.page_location == null) {
    template.page_location = window.location.href;
  }

  if (template.send_page_view == null) {
    template.send_page_view = true;
  }

  event("page_view", template);
};
