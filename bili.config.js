import { name } from "./package.json";

/** @type {import('bili').Config} */
const config = {
  input: {
    [name]: "./src/index.js"
  },
  output: {
    dir: "./dist/",
    format: ["esm", "cjs", "umd", "umd-min"],
    moduleName: "VueGtag"
  }
};

export default config;
