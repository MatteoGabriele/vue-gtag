import { getOptions } from "../install";
import query from "./query";

export default (name, _params = {}) => {
  const { defaultGroupName, includes } = getOptions();
  const params = _params;

  if (includes && params.send_to == null) {
    params.send_to = includes
      .map((include) => include.id)
      .concat(defaultGroupName);
  }

  query("event", name, params);
};
