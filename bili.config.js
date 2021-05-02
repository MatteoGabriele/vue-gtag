import path from "path";
import { name } from "./package.json";

const isDev = process.env.NODE_ENV === "dev";

const config = {
  input: {
    [name]: "./src/index.js",
  },
  externals: ["vue"],
  plugins: {
    alias: {
      resolve: [".js"],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(__dirname, "src/$1") },
      ],
    },
  },
  output: {
    dir: "./dist/",
    format: isDev ? ["esm"] : ["esm", "cjs", "umd", "umd-min"],
    moduleName: "VueGtag",
  },
};

export default config;
