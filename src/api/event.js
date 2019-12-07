import { getOptions } from "../install";
import query from "./query";

export default (name, _params = {}) => {
  const { defaultGroupName, sendTo } = getOptions();
  const params = _params;

  if (sendTo && params.send_to == null) {
    params.send_to = sendTo.concat(defaultGroupName);
  }

  query("event", name, params);
};
