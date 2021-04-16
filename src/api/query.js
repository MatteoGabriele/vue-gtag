import options from "@/options";

const query = (...args) => {
  if (typeof window === "undefined") {
    return;
  }

  window[options.globalObjectName](...args);
};

export default query;
