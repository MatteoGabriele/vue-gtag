const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = function(env, argv) {
  const isProd = argv.mode === "production";

  return {
    devtool: isProd ? false : "cheap-module-eval-source-map",
    output: {
      libraryTarget: "umd",
      filename: "vue-gtag.js",
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: isProd
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "./src"),
          loader: "babel-loader"
        }
      ]
    },
    plugins: [...(isProd ? [new CompressionPlugin()] : [])]
  };
};
