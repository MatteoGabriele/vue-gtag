import query from "./query";

export default pageview => {
  query("config", pageview);
};
