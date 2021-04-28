import { getOptions } from "@/options";
import query from "@/api/query";

export default (name, params = {}) => {
  const { includes, defaultGroupName } = getOptions();

  if (params.send_to == null && Array.isArray(includes) && includes.length) {
    params.send_to = includes
      .map((domain) => domain.id)
      .concat(defaultGroupName);
  }

  query("event", name, params);
};
